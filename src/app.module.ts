import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PlanModule } from './plan/plan.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClientModule,
    PlanModule,
    MessageModule,
    PrismaModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
