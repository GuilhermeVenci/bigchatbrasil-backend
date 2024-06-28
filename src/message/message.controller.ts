import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SendMessageDto } from './send-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Body() data: SendMessageDto) {
    return this.messageService.sendMessage(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getMessages(@Param('id') userId: string) {
    return this.messageService.getMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    const messageId = parseInt(id);
    return this.messageService.getMessageById(messageId);
  }
}
