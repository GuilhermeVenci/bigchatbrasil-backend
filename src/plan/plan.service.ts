import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Plan, Prisma } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async createPlan(data: Prisma.PlanCreateInput): Promise<Plan> {
    return this.prisma.plan.create({ data });
  }

  async getPlanById(id: number): Promise<Plan | null> {
    return this.prisma.plan.findUnique({ where: { id } });
  }

  async updatePlan(id: number, data: Prisma.PlanUpdateInput): Promise<Plan> {
    return this.prisma.plan.update({ where: { id }, data });
  }

  async deletePlan(id: number): Promise<Plan> {
    return this.prisma.plan.delete({ where: { id } });
  }

  async getAllPlans(): Promise<Plan[]> {
    return this.prisma.plan.findMany();
  }
}
