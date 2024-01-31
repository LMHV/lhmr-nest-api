import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [PrismaModule],
})
export class SaleModule {}