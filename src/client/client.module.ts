import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [PrismaModule, PostgresModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
