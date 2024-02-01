import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO)
    if (!product) {
      throw new NotFoundException('No se pudo crear el producto')
    }
    return product
  }

  @Get('/:userId')
  async getProductsByUserId(@Param('userId') userId: string) {
    const products = await this.productService.getProductsByUserId(userId)
    if (!products.length) {
      return {
        message: 'No hay productos.',
        products: []
      }
    }
    return {
      products,
      message: 'Petición exitosa.'
    }
  }


  @Post('/update/:id/:productPrice')
  async updateProductPrice(@Param('id', ParseIntPipe) id: number, @Param('productPrice', ParseIntPipe) productPrice: number) {
    const updatedProduct = await this.productService.updateProductPrice(id, productPrice)
    if (!updatedProduct) {
      throw new Error('No se pudo actualizar el precio del producto')
    }
    return updatedProduct
  }
}
