import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { NotificationStatus, User } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: User) {
    return this.prismaService.notification.findMany({
      where: { establishmentId: user.establishmentId, userId: user.id },
    });
  }

  async findById(notificationId: string, user: User) {
    return this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
        userId: user.id,
        establishmentId: user.establishmentId,
      },
    });
  }

  async createNotification(user: User) {
    return this.prismaService.notification.create({
      data: {
        userId: user.id,
        establishmentId: user.establishmentId,
      },
    });
  }

  async confirmNotification(notificationId: string, user: User) {
    return this.prismaService.notification.update({
      where: {
        id: notificationId,
        userId: user.id,
        establishmentId: user.establishmentId,
      },
      data: {
        status: NotificationStatus.CONFIRMED,
      },
    });
  }
}
