import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '@app/auth/jwt/jwt.guard';
import { Roles } from '@app/auth/role.decorator';
import { RoleGuard } from '@app/auth/role.guard';
import { User } from '@prisma/client';

@Roles('ESTABLISHMENT')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getAllNotifications(@Request() req: { user: User }) {
    return this.notificationService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getNotificationById(
    @Param('id') id: string,
    @Request() req: { user: User },
  ) {
    return this.notificationService.findById(id, req.user);
  }

  @Post('')
  async createNotification(@Request() req: { user: User }) {
    return this.notificationService.createNotification(req.user);
  }

  @Post(':id/confirm')
  async confirmNotification(
    @Param('id') id: string,
    @Request() req: { user: User },
  ) {
    return this.notificationService.confirmNotification(id, req.user);
  }
}
