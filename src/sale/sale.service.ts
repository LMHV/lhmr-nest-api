import { Injectable } from "@nestjs/common";
import { Sale } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDTO, DeleteSaleDTO } from "./sale.dto";

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) { }

  async getAllSales(): Promise<Sale[]> {
    return this.prisma.sale.findMany()
  }

  async getSaleByUserId(userId: string): Promise<Sale[]> {
    const sales = await this.prisma.sale.findMany({
      where: {
        userId
      }
    })
    return sales
  }

  async getRecentSalesByUserId(userId: string): Promise<Sale[]> {
    const sales = await this.prisma.sale.findMany({
      where: {
        userId
      },
      orderBy: { date: 'desc' },
      take: 10
    })
    return sales
  }

  async createSale(sale: CreateSaleDTO): Promise<Sale> {
    const { userId, products } = sale
    const response = await this.prisma.sale.create({
      data: {
        userId,
        products,
      }
    })
    return response
  }

  async deleteSale(query: DeleteSaleDTO): Promise<Sale> {
    const { userId, saleId } = query

    const response = await this.prisma.sale.delete({
      where: {
        userId,
        id: saleId,
      }
    })
    return response
  }
}