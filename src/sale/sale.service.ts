import { Injectable } from "@nestjs/common";
import { Sale } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async getAllSales(): Promise<Sale[]> {
    return this.prisma.sale.findMany()
  }

  async getSaleById(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id
      }
    })

    return sale as Sale
  }
}