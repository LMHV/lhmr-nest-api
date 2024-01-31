import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { SaleService } from "./sale.service";

@Controller('/api/sales')
export class SaleController {
  constructor (private readonly saleService: SaleService) {}

  @Get()
  async getAllSales() {
    return this.saleService.getAllSales()
  }

  @Get(':id')
  async getSaleById(@Param('id') id:string) {
    const saleFound = await this.saleService.getSaleById(Number(id))
    if(!saleFound) throw new NotFoundException('No existe la venta')
    return saleFound
  }
}