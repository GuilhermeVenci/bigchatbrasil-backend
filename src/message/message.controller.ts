import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Body() messageData: Prisma.MessageCreateInput) {
    return this.messageService.sendMessage(messageData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMessages() {
    return this.messageService.getMessages();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessageById(@Param('id') id: number) {
    return this.messageService.getMessageById(id);
  }
}
