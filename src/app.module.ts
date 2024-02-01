import { Module } from '@nestjs/common';
import { SaleModule } from './sale/sale.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [SaleModule, UserModule, ProductModule, WebhookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
