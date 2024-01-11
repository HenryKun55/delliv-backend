import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderSerivce {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string) {
    const orders = await this.prismaService.order.findMany({
      where: { userId },
    });

    return orders;
  }

  findById(orderId: string, userId: string) {
    return this.prismaService.order.findUnique({
      where: { userId, id: orderId },
    });
  }
}
