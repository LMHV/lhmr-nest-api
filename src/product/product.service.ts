import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDTO } from './dto/create-product.dto';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async createProduct(product: CreateProductDTO): Promise<Product> {
    const { userId, productName, price, measurementUnits, stock } = product
    const response = await this.prisma.product.create({
      data: {
        userId,
        productName,
        price,
        measurementUnits,
        stock,
      }
    })
    return response
  }

  async getProductsByUserId(userId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        userId
      }
    })
    return products
  }

  async updateProductPrice(id: number, productPrice: number): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id
      },
      data: {
        price: productPrice
      }
    })
    return updatedProduct
  }

  async deleteProduct(userId: string, productId: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        userId,
        id: productId
      }
    })

    return deletedProduct
  }
}
