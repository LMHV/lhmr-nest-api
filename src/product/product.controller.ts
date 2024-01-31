import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = this.productService.createProduct(createProductDTO)
    if (!product) {
      throw new NotFoundException('No se pudo crear el producto')
    }
    return product
  }

  @Get(':userId')
  async getProductsByUserId(@Param('userId') userId: string) {
    const products = this.productService.getProductsByUserId(userId)
    if (!products) {
      throw new NotFoundException('No existen productos para dicho usuario.')
    }
    return products
  }


  @Post('/update/:id/:productPrice')
  async updateProductPrice(@Param('id', ParseIntPipe) id: number, @Param('productPrice', ParseIntPipe) productPrice: number) {
    const updatedProduct = this.productService.updateProductPrice(id, productPrice)
    if (!updatedProduct) {
      throw new Error('No se pudo actualizar el precio del producto')
    }
    return updatedProduct
  }
}
