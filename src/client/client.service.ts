import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Client, Plan, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    if (!data.user || !data.user.connect || !data.user.connect.id) {
      throw new Error('User information is missing or incorrect' + data.user);
    }

    return this.prisma.client.create({
      data: {
        user: {
          connect: { id: data.user.connect.id },
        },
        phone: data.phone,
        cpf: data.cpf,
        cnpj: data.cnpj,
        companyName: data.companyName,
        name: data.name,
        plan: data.plan,
        credits: data.credits,
        limit: data.limit,
      },
    });
  }

  async getClientById(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }

  async getClientByUserId(userId: string) {
    return this.prisma.client.findUnique({
      where: { userId },
    });
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

  async setClientPlanByUserId(id: number, plan: Plan): Promise<Client> {
    return this.prisma.client.update({
      where: { id },
      data: { plan },
    });
  }
}
