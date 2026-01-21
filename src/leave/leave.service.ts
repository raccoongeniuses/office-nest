import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { LeaveRequest } from '@prisma/client';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createLeaveDto: CreateLeaveDto,
  ): Promise<LeaveRequest> {
    const { startDate, endDate, ...rest } = createLeaveDto;
    return this.prisma.leaveRequest.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });
  }

  async findAll(userId?: number): Promise<LeaveRequest[]> {
    if (userId) {
      return this.prisma.leaveRequest.findMany({ where: { userId } });
    }
    return this.prisma.leaveRequest.findMany({ include: { user: true } });
  }

  async findOne(id: number): Promise<LeaveRequest | null> {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async update(
    id: number,
    userId: number,
    updateLeaveDto: any,
  ): Promise<LeaveRequest> {
    const leave = await this.findOne(id);
    if (!leave || leave.userId !== userId) {
      throw new Error('Leave request not found or unauthorized');
    }
    if (leave.status !== 'PENDING') {
      throw new Error('Cannot update a non-pending leave request');
    }

    const { startDate, endDate, ...rest } = updateLeaveDto;
    const data: any = { ...rest };
    if (startDate) data.startDate = new Date(startDate);
    if (endDate) data.endDate = new Date(endDate);

    return this.prisma.leaveRequest.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, userId: number): Promise<LeaveRequest> {
    const leave = await this.findOne(id);
    if (!leave || leave.userId !== userId) {
      throw new Error('Leave request not found or unauthorized');
    }
    if (leave.status !== 'PENDING') {
      throw new Error('Cannot delete a non-pending leave request');
    }
    return this.prisma.leaveRequest.delete({ where: { id } });
  }
}
