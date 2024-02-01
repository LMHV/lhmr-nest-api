import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserJSON } from '@clerk/clerk-sdk-node';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: UserJSON) {
    try {
      await this.prisma.user.create({
        data: {
          externalId: data.id!,
          username: 'hola',
          email: data.email_addresses[0].email_address,
          subscriptionStatus: 'No Abonado',
          subscriptionPlan: 'Sin plan',
        }
      })

    } catch (error) {
      throw new Error('error')
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
