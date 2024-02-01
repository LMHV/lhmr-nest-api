import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [PrismaModule]
})
export class WebhookModule {}
