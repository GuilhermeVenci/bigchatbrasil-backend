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
import { Plan } from '@prisma/client';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClient(@Body() createClientDto) {
    const clientData = {
      ...createClientDto,
      user: {
        connect: { id: createClientDto.userId },
      },
    };

    return this.clientService.createClient(clientData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getClientById(@Param('userId') id: string) {
    return this.clientService.getClientByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getClientByUserId(@Param('userId') userId: string) {
    return this.clientService.getClientByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() updateClientDto) {
    const clientId = parseInt(id);
    return this.clientService.updateClient(clientId, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/add-credits')
  async addCredits(@Param('id') id: string, @Body() body) {
    const clientId = parseInt(id);
    return this.clientService.addCredits(clientId, body.credits);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-limit')
  async setClientLimit(@Param('id') id: string, @Body() body) {
    const clientId = parseInt(id);
    return this.clientService.setClientLimit(clientId, body.limit);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-plan')
  async setClientPlanByUserId(@Param('id') id: string, @Body() body) {
    const clientId = parseInt(id);
    return this.clientService.setClientPlanByUserId(
      clientId,
      body.plan as Plan
    );
  }
}
