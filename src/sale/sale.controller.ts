import { Body, Controller, Get, Param, Post, Delete, ParseIntPipe } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDTO } from "./dto/create-sale.dto";

@Controller('/api/sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Get()
  async getAllSales() {
    return this.saleService.getAllSales()
  }

  @Get(':userId')
  async getSaleByUserId(@Param('userId') userId: string) {
    const salesFound = await this.saleService.getSaleByUserId(userId)

    if (!salesFound.length) {
      return {
        message: 'No se encontraron ventas para el usuario',
        sales: []
      }
    }
    return {
      sales: salesFound,
      message: 'Petición'
    }

  }

  @Get('recent/:userId')
  async getRecentSalesByUserId(@Param('userId') userId: string) {
    const recentSales = await this.saleService.getRecentSalesByUserId(userId)

    if (!recentSales.length) {
      return {
        message: 'No se realizaron ventas',
        sales: [],
      }
    }

    return {
      sales: recentSales,
      message: 'Petición exitosa.'
    }
  }

  @Post()
  async createSale(@Body() createSaleDTO: CreateSaleDTO) {
    const sale = await this.saleService.createSale(createSaleDTO);
    return sale
  }

  @Delete('/:userId/:saleId')
  async deleteSale(@Param('userId') userId: string, @Param('saleId', ParseIntPipe) saleId: number) {
    const sale = await this.saleService.deleteSale(userId, saleId)
    return sale
  }
}