import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id, role: Role.DELIVERY_MAN },
    });
  }

  async updateLocation(id: string, newLocation: string) {
    // You may use WebSocket or another real-time communication method
  }
}
