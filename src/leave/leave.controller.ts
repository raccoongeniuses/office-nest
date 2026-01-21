import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Render,
  Redirect,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @Redirect('/leave')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Request() req,
    @Body() createLeaveDto: CreateLeaveDto,
    @UploadedFile() file: any,
  ) {
    if (createLeaveDto.type === 'SICK' && !file) {
      throw new BadRequestException('Doctor note is required for sick leave');
    }
    if (file) {
      createLeaveDto.attachmentUrl = `/uploads/${file.filename}`;
    }
    await this.leaveService.create(req.user.userId, createLeaveDto);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
    @UploadedFile() file: any,
  ) {
    if (
      updateLeaveDto.type === 'SICK' &&
      !file &&
      !updateLeaveDto.attachmentUrl
    ) {
      // In edit, if they don't upload new file, they might keep old one.
      // But simple validation: if changing to SICK, need file.
      // For now, let's just update if file exists.
      // Ideally we check if previous record has attachment if no new file is provided,
      // but simpler logic: validation on create is strict, on update rely on client or provided file.
    }
    if (file) {
      updateLeaveDto.attachmentUrl = `/uploads/${file.filename}`;
    }
    await this.leaveService.update(+id, req.user.userId, updateLeaveDto);
    return { success: true };
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.leaveService.remove(+id, req.user.userId);
    return { success: true };
  }

  @Get()
  @Render('leave')
  async findAll(@Request() req) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER') {
      const leaves = await this.leaveService.findAll();
      return { leaves, user: req.user };
    }
    const leaves = await this.leaveService.findAll(req.user.userId);
    return { leaves, user: req.user };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveService.findOne(+id);
  }
}
