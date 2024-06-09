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
  async setClientPlanByUserId(@Param('userId') userId: string, @Body() body) {
    return this.clientService.setClientPlanByUserId(userId, body.plan as Plan);
  }
}
