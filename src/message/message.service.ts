import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data: {
        phoneNumber: data.phoneNumber,
        isWhatsApp: data.isWhatsApp,
        text: data.text,
        sentAt: data.sentAt,
        client: {
          connect: { id: data.client.connect.id },
        },
      },
    });
  }

  async getMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async getMessageById(id: number): Promise<Message> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }
}
