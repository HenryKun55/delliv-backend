import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllNotifications() {
    return this.prismaService.notification.findMany();
  }

  async getNotificationById(id: string) {
    return this.prismaService.notification.findUnique({ where: { id } });
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return this.prismaService.notification.create({
      data: createNotificationDto,
    });
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    const existingNotification =
      await this.prismaService.notification.findUnique({ where: { id } });
    if (!existingNotification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return this.prismaService.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async deleteNotification(id: string) {
    const deletedNotification = await this.prismaService.notification.delete({
      where: { id },
    });
    if (!deletedNotification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return deletedNotification;
  }
}
