import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (existingAttendance) {
      throw new BadRequestException('Already checked in today');
    }

    const now = new Date();
    const startOfWork = new Date();
    startOfWork.setHours(9, 0, 0, 0); // 9:00 AM

    const isOnTime = now <= startOfWork;
    const status = isOnTime ? 'ON_TIME' : 'LATE';

    // XP Calculation
    let xpEarned = 10; // Base daily check-in
    if (isOnTime) {
      xpEarned += 5; // Punctuality bonus
    }

    // Streak Logic
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check yesterday's attendance to maintain streak
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayAttendance = await this.prisma.attendance.findFirst({
      where: { userId, date: yesterday },
    });

    let newStreak = 1;
    if (yesterdayAttendance) {
      newStreak = user.currentStreak + 1;
    }

    // Streak Bonus (every 5 days)
    if (newStreak % 5 === 0) {
      xpEarned += 20;
    }

    // Create Attendance Record
    await this.prisma.attendance.create({
      data: {
        userId,
        date: today,
        checkIn: now,
        status,
        xpEarned,
      },
    });

    // Update User Stats
    const newXp = user.xp + xpEarned;
    const newLevel = Math.floor(newXp / 100);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
        currentStreak: newStreak,
      },
    });

    // Check Badges
    await this.checkBadges(userId);

    return { message: 'Checked in successfully', xpEarned, status };
  }

  async checkOut(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await this.prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (!attendance) {
      throw new BadRequestException('No check-in record for today');
    }

    if (attendance.checkOut) {
      throw new BadRequestException('Already checked out');
    }

    await this.prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: new Date(),
      },
    });

    return { message: 'Checked out successfully' };
  }

  async getTodayAttendance(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.attendance.findFirst({
      where: { userId, date: today },
    });
  }

  async getLeaderboard() {
    return this.prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        xp: true,
        level: true,
        currentStreak: true,
        badges: {
          include: { badge: true },
        },
      },
    });
  }

  private async checkBadges(userId: number) {
    // Early Bird: 10 On-time arrivals
    const onTimeCount = await this.prisma.attendance.count({
      where: { userId, status: 'ON_TIME' },
    });

    if (onTimeCount >= 10) {
      await this.assignBadge(
        userId,
        'Early Bird',
        'Checked in on time 10 times',
        'early_bird_icon',
      );
    }

    // Consistent: 5 day streak
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user && user.currentStreak >= 5) {
      await this.assignBadge(
        userId,
        'Consistent',
        ' maintained a 5-day streak',
        'fire_icon',
      );
    }
  }

  private async assignBadge(
    userId: number,
    name: string,
    description: string,
    icon: string,
  ) {
    // Ensure badge exists
    let badge = await this.prisma.badge.findUnique({ where: { name } });
    if (!badge) {
      badge = await this.prisma.badge.create({
        data: { name, description, icon },
      });
    }

    // Assign to user if not already
    const hasBadge = await this.prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId: badge.id,
        },
      },
    });

    if (!hasBadge) {
      await this.prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      });
    }
  }
}
