import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async createClient(@Body() createClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Get(':id')
  async getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }

  @Put(':id')
  async updateClient(@Param('id') id: number, @Body() updateClientDto) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Put(':id/add-credits')
  async addCredits(@Param('id') id: number, @Body() body) {
    return this.clientService.addCredits(id, body.credits);
  }

  @Put(':id/set-limit')
  async setClientLimit(@Param('id') id: number, @Body() body) {
    return this.clientService.setClientLimit(id, body.limit);
  }

  @Put(':id/set-plan')
  async setClientPlan(@Param('id') id: number, @Body() body) {
    return this.clientService.setClientPlan(id, body.planId);
  }
}
