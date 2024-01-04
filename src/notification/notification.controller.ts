import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    const notification = await this.notificationService.getNotificationById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Put(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    const notification = await this.notificationService.updateNotification(
      id,
      updateNotificationDto,
    );
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    const deletedNotification =
      await this.notificationService.deleteNotification(id);
    if (!deletedNotification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return deletedNotification;
  }
}
