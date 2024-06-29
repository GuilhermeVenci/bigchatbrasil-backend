import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsInt,
} from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsBoolean()
  @IsNotEmpty()
  isWhatsApp: boolean;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  @IsOptional()
  sentAt?: Date;

  @IsInt()
  @IsNotEmpty()
  clientId: number;
}
