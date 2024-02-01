import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, UserService],
  imports: [PrismaModule]
})
export class WebhookModule {}
