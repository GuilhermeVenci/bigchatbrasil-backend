import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Client, Plan, Prisma } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: CreateClientDto): Promise<Client> {
    const { userId, ...rest } = data;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const clientData: Prisma.ClientCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.prisma.client.create({
      data: clientData,
    });
  }

  async getClientById(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async getClientByUserId(userId: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { userId },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async updateClient(clientId: number, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id: clientId },
      data,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async deleteClient(id: number): Promise<Client> {
    const client = await this.prisma.client.delete({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async addCredits(clientId: number, credits: number): Promise<Client> {
    const client = await this.getClientById(clientId);
    return this.prisma.client.update({
      where: { id: clientId },
      data: { credits: client.credits + credits },
    });
  }

  async setClientLimit(clientId: number, limit: number): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id: clientId },
      data: { limit },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async setClientPlanByUserId(clientId: number, plan: Plan): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id: clientId },
      data: { plan },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
