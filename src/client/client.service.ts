import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({ data });
  }

  async getClientById(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }

  async updateClient(
    id: number,
    data: Prisma.ClientUpdateInput
  ): Promise<Client> {
    return this.prisma.client.update({ where: { id }, data });
  }

  async deleteClient(id: number): Promise<Client> {
    return this.prisma.client.delete({ where: { id } });
  }

  async addCredits(clientId: number, credits: number): Promise<Client> {
    const client = await this.getClientById(clientId);
    return this.prisma.client.update({
      where: { id: clientId },
      data: { credits: client.credits + credits },
    });
  }

  async setClientLimit(clientId: number, limit: number): Promise<Client> {
    return this.prisma.client.update({
      where: { id: clientId },
      data: { limit },
    });
  }

  async setClientPlan(clientId: number, planId: number): Promise<Client> {
    return this.prisma.client.update({
      where: { id: clientId },
      data: { planId },
    });
  }
}
