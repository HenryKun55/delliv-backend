import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { RegisterOrdersDto } from './dtos/register-order.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    return this.prismaService.deliveryPerson.findUnique({ where: { id } });
  }

  async updateLocation(id: string, newLocation: string) {
    const deliveryPerson = await this.prismaService.deliveryPerson.findUnique({
      where: { id },
    });

    return this.prismaService.deliveryPerson.update({
      where: { id: deliveryPerson.id },
      data: { location: newLocation },
    });
  }

  async getOrdersForDeliveryPerson(id: string): Promise<OrderDto[]> {
    return this.prismaService.order.findMany({
      where: { deliveryPersonId: id },
      include: { establishment: { select: { orders: true } } },
    });
  }

  async notifyArrival(id: string): Promise<void> {
    // Implement the logic to send a notification about the arrival to the establishment
    // You may use WebSocket or another real-time communication method
  }

  async confirmArrival(id: string): Promise<void> {
    // Implement the logic to confirm the arrival and register the confirmation in the backend
  }

  async registerOrders(
    id: string,
    ordersDto: RegisterOrdersDto,
  ): Promise<void> {
    const deliveryPerson = await this.prismaService.deliveryPerson.findUnique({
      where: { id },
    });

    if (!deliveryPerson) {
      throw new NotFoundException('Delivery person not found');
    }

    await this.prismaService.order.createMany({ data: ordersDto.orders });
  }
}
