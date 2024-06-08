import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('plans')
export class PlanController {
  constructor(private planService: PlanService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPlan(@Body() createPlanDto) {
    return this.planService.createPlan(createPlanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPlanById(@Param('id') id: number) {
    return this.planService.getPlanById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePlan(@Param('id') id: number, @Body() updatePlanDto) {
    return this.planService.updatePlan(id, updatePlanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePlan(@Param('id') id: number) {
    return this.planService.deletePlan(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPlans() {
    return this.planService.getAllPlans();
  }
}
