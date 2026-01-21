import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateLeaveDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsString()
  reason: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}
