import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '@prisma/client';

@Injectable()
export class EstablishmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: User) {
    return this.prismaService.order.findMany({
      where: { establishmentId: user.establishmentId, userId: user.id },
    });
  }

  async createOrder(input: CreateOrderDto, user: User) {
    return this.prismaService.order.create({
      data: {
        userId: user.id,
        customerName: input.customerName,
        establishmentId: user.establishmentId,
      },
    });
  }
}
