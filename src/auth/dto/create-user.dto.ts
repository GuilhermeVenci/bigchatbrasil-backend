import {
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Provider, Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  provider?: Provider = Provider.EMAIL;

  @IsOptional()
  role?: Role = Role.CLIENT;
}
