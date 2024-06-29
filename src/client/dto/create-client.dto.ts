import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Plan } from '@prisma/client';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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
