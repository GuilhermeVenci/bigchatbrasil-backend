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
        client: data.client,
      },
    });
  }

  async getMessages(userId: string): Promise<Message[]> {
    const client = await this.prisma.client.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    return this.prisma.message.findMany({
      where: { clientId: client.id },
    });
  }

  async getMessageById(id: number): Promise<Message> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }
}
