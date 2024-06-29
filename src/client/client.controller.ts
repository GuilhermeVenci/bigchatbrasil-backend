import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Plan } from '@prisma/client';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClientById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getClientByUserId(@Param('userId') userId: string) {
    return this.clientService.getClientByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/add-credits')
  async addCredits(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { credits: number }
  ) {
    return this.clientService.addCredits(id, body.credits);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-limit')
  async setClientLimit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { limit: number }
  ) {
    return this.clientService.setClientLimit(id, body.limit);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/set-plan')
  async setClientPlanByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { plan: Plan }
  ) {
    return this.clientService.setClientPlanByUserId(id, body.plan);
  }

  @UseGuards(JwtAuthGuard)
  @Post('native')
  async createClientNatively(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClientNatively(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('native/:id')
  async getClientByIdNatively(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClientByIdNatively(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('native/user/:userId')
  async getClientByUserIdNatively(@Param('userId') userId: string) {
    return this.clientService.getClientByUserIdNatively(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('native/:id')
  async updateClientNatively(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientService.updateClientNatively(id, updateClientDto);
  }
}
