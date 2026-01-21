import {
  Controller,
  Get,
  Render,
  UseGuards,
  Request,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @Redirect('/login')
  root() {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  @Render('dashboard')
  async getDashboard(@Request() req) {
    const userId = req.user.userId;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { badges: { include: { badge: true } } },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attendance = await this.prisma.attendance.findFirst({
      where: { userId, date: today },
    });

    if (!user) {
      return { user: null }; // Should handle gracefully
    }

    const nextLevelXp = (user.level + 1) * 100;
    const currentLevelXp = user.level * 100; // Base XP for current level
    const xpProgress = user.xp % 100; // Since each level is 100 XP

    return {
      user,
      attendance,
      isCheckedIn: !!attendance,
      isCheckedOut: !!attendance?.checkOut,
      nextLevelXp,
      xpProgress,
    };
  }
}
