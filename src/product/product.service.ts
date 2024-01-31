import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDTO } from './dto/create-product.dto';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async createProduct(product: CreateProductDTO): Promise<Product> {
    const { userId, productName, price, measurementUnits, stock } = product
    const response = this.prisma.product.create({
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
    const products = this.prisma.product.findMany({
      where: {
        userId
      }
    })
    return products
  }

  async updateProductPrice(id: number, productPrice: number): Promise<Product> {
    const updatedProduct = this.prisma.product.update({
      where: {
        id
      },
      data: {
        price: productPrice
      }
    })
    return updatedProduct
  }
}
