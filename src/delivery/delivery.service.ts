import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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

    if (!deliveryPerson) {
      return null; // or throw an exception
    }

    deliveryPerson.location = newLocation;
    return this.deliveryPersonRepository.save(deliveryPerson);
  }

  async getOrdersForDeliveryPerson(id: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { deliveryPersonId: id } });
  }

  async notifyArrival(id: string): Promise<void> {
    // Implement the logic to send a notification about the arrival to the establishment
    // You may use WebSocket or another real-time communication method
  }

  async confirmArrival(id: string): Promise<void> {
    // Implement the logic to confirm the arrival and register the confirmation in the backend
  }

  async registerOrders(id: string, orders: Order[]): Promise<void> {
    // Implement the logic to register orders for the delivery person
    // You may want to validate the number of orders and other details
  }

  // Add other methods as needed
}
