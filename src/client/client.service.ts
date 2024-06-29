import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Client, Plan, Prisma } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PostgresService } from 'src/postgres/postgres.service';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private postgresService: PostgresService
  ) {}

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

  async createClientNatively(data: CreateClientDto): Promise<Client> {
    const {
      userId,
      phone,
      cpf,
      cnpj,
      companyName,
      name,
      plan,
      credits = 0,
      limit = 10,
    } = data;

    const result = await this.postgresService.getPool().query<Client>(
      `INSERT INTO "clients" ("user_id", "phone", "cpf", "cnpj", "company_name", "name", "plan", "credits", "limit")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [userId, phone, cpf, cnpj, companyName, name, plan, credits, limit]
    );

    return result.rows[0];
  }

  async updateClientNatively(
    id: number,
    data: UpdateClientDto
  ): Promise<Client> {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.phone !== undefined) {
      fields.push(`"phone" = $${index++}`);
      values.push(data.phone);
    }
    if (data.cpf !== undefined) {
      fields.push(`"cpf" = $${index++}`);
      values.push(data.cpf);
    }
    if (data.cnpj !== undefined) {
      fields.push(`"cnpj" = $${index++}`);
      values.push(data.cnpj);
    }
    if (data.companyName !== undefined) {
      fields.push(`"company_name" = $${index++}`);
      values.push(data.companyName);
    }
    if (data.name !== undefined) {
      fields.push(`"name" = $${index++}`);
      values.push(data.name);
    }
    if (data.plan !== undefined) {
      fields.push(`"plan" = $${index++}`);
      values.push(data.plan);
    }
    if (data.credits !== undefined) {
      fields.push(`"credits" = $${index++}`);
      values.push(data.credits);
    }
    if (data.limit !== undefined) {
      fields.push(`"limit" = $${index++}`);
      values.push(data.limit);
    }

    values.push(id);

    const result = await this.postgresService.getPool().query<Client>(
      `UPDATE "clients"
       SET ${fields.join(', ')}
       WHERE "id" = $${index}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Client not found');
    }

    return result.rows[0];
  }

  async getClientByIdNatively(id: number): Promise<Client | null> {
    const result = await this.postgresService
      .getPool()
      .query<Client>(`SELECT * FROM "clients" WHERE "id" = $1`, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException('Client not found');
    }

    return result.rows[0];
  }

  async getClientByUserIdNatively(userId: string): Promise<Client | null> {
    const result = await this.postgresService
      .getPool()
      .query<Client>(`SELECT * FROM "clients" WHERE "user_id" = $1`, [userId]);

    if (result.rows.length === 0) {
      throw new NotFoundException('Client not found');
    }

    return result.rows[0];
  }
}
