import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReimbursementDto } from './dto/create-reimbursement.dto';
import { Reimbursement } from '@prisma/client';

@Injectable()
export class ReimbursementService {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, dto: CreateReimbursementDto): Promise<Reimbursement> {
        const { date, ...rest } = dto;
        return this.prisma.reimbursement.create({
            data: {
                ...rest,
                date: new Date(date),
                userId,
            },
        });
    }

    async findAll(userId?: number): Promise<Reimbursement[]> {
        if (userId) {
            return this.prisma.reimbursement.findMany({ where: { userId } });
        }
        return this.prisma.reimbursement.findMany({ include: { user: true } });
    }

    async approve(id: number): Promise<Reimbursement> {
        return this.prisma.reimbursement.update({
            where: { id },
            data: { status: 'APPROVED' }
        });
    }

    async reject(id: number): Promise<Reimbursement> {
        return this.prisma.reimbursement.update({
            where: { id },
            data: { status: 'REJECTED' }
        });
    }
}
