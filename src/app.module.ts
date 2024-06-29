import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma/prisma.service';
import { PostgresService } from './postgres/postgres.service';

@Module({
  imports: [AuthModule, UserModule, ClientModule, MessageModule, PrismaModule],
  providers: [PostgresService, PrismaService],
})
export class AppModule {}
