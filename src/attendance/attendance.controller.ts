import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Render,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  async checkIn(@Request() req) {
    return this.attendanceService.checkIn(req.user.userId);
  }

  @Post('check-out')
  async checkOut(@Request() req) {
    return this.attendanceService.checkOut(req.user.userId);
  }

  @Get('today')
  async getToday(@Request() req) {
    return this.attendanceService.getTodayAttendance(req.user.userId);
  }

  @Get('leaderboard')
  @Render('leaderboard')
  async getLeaderboard() {
    const leaderboard = await this.attendanceService.getLeaderboard();
    return { leaderboard };
  }
}
