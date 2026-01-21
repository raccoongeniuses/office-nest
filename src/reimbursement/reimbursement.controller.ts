import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
  Render,
  Redirect,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ReimbursementService } from './reimbursement.service';
import { CreateReimbursementDto } from './dto/create-reimbursement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('reimbursement')
@UseGuards(JwtAuthGuard)
export class ReimbursementController {
  constructor(private readonly reimbursementService: ReimbursementService) {}

  @Post()
  @Redirect('/reimbursement')
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
    @Body() dto: CreateReimbursementDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      dto.attachmentUrl = `/uploads/${file.filename}`;
    }
    await this.reimbursementService.create(req.user.userId, dto);
  }

  @Get()
  @Render('reimbursement')
  async findAll(@Request() req) {
    let reimbursements;
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER') {
      reimbursements = await this.reimbursementService.findAll();
    } else {
      reimbursements = await this.reimbursementService.findAll(req.user.userId);
    }
    return { reimbursements, user: req.user };
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.reimbursementService.approve(+id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.reimbursementService.reject(+id);
  }
}
