import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Plan } from '@prisma/client';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Plan)
  @IsOptional()
  plan?: Plan;

  @IsNumber()
  @IsOptional()
  credits?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
