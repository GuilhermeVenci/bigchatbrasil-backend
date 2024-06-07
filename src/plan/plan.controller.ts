import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private planService: PlanService) {}

  @Post()
  async createPlan(@Body() createPlanDto) {
    return this.planService.createPlan(createPlanDto);
  }

  @Get(':id')
  async getPlanById(@Param('id') id: number) {
    return this.planService.getPlanById(id);
  }

  @Put(':id')
  async updatePlan(@Param('id') id: number, @Body() updatePlanDto) {
    return this.planService.updatePlan(id, updatePlanDto);
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: number) {
    return this.planService.deletePlan(id);
  }

  @Get()
  async getAllPlans() {
    return this.planService.getAllPlans();
  }
}
