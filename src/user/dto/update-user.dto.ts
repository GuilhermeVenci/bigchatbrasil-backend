import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Provider, Role } from '@prisma/client';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  provider?: Provider;

  @IsOptional()
  role?: Role;
}
