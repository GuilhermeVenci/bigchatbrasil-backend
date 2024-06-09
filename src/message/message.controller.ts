import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { SendMessageDto } from './send-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Body() data: SendMessageDto) {
    const messageData: Prisma.MessageCreateInput = {
      phoneNumber: data.phoneNumber,
      isWhatsApp: data.isWhatsApp,
      text: data.text,
      sentAt: data.sentAt,
      client: {
        connect: { id: data.clientId },
      },
    };

    return this.messageService.sendMessage(messageData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getMessages(@Param('id') userId: string) {
    return this.messageService.getMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessageById(@Param('id') id: number) {
    return this.messageService.getMessageById(id);
  }
}
