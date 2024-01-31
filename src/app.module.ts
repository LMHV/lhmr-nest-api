import { Module } from '@nestjs/common';
import { SaleModule } from './sale/sale.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
