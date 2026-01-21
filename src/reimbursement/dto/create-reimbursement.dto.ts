import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateReimbursementDto {
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
