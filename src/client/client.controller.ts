import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClient(@Body() createClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateClient(@Param('id') id: number, @Body() updateClientDto) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/add-credits')
  async addCredits(@Param('id') id: number, @Body() body) {
    return this.clientService.addCredits(id, body.credits);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-limit')
  async setClientLimit(@Param('id') id: number, @Body() body) {
    return this.clientService.setClientLimit(id, body.limit);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-plan')
  async setClientPlan(@Param('id') id: number, @Body() body) {
    return this.clientService.setClientPlan(id, body.planId);
  }
}
