import { Body, Controller, Get, NotFoundException, Param, Post, Delete, Query } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDTO } from "./dto/create-sale.dto";
import { DeleteSaleDTO } from "./dto/delete-sal.dto";

@Controller('/api/sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Get()
  async getAllSales() {
    return this.saleService.getAllSales()
  }

  @Get(':userId')
  async getSaleByUserId(@Param('userId') userId: string) {
    const saleFound = await this.saleService.getSaleByUserId(userId)
    if (!saleFound) throw new NotFoundException('No existe la venta')
    return saleFound
  }

  @Get('recent/:userId')
  async getRecentSalesByUserId(@Param('userId') userId: string) {
    const recentSales = await this.saleService.getRecentSalesByUserId(userId)
    if (!recentSales) throw new NotFoundException('No se encontraron ventas recientes para este usuario.')
    return recentSales
  }

  @Post()
  async createSale(@Body() createSaleDTO: CreateSaleDTO) {
    const sale = await this.saleService.createSale(createSaleDTO);
    return sale
  }

  @Delete()
  async deleteSale(@Query() query: DeleteSaleDTO) {
    const sale = await this.saleService.deleteSale(query)
    return sale
  }
}