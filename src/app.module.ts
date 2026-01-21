import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { LeaveModule } from './leave/leave.module';
import { ReimbursementModule } from './reimbursement/reimbursement.module';
import { AttendanceModule } from './attendance/attendance.module';

@Global()
@Module({
  imports: [
    UsersModule,
    AuthModule,
    LeaveModule,
    ReimbursementModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
