import { Prisma } from '@prisma/client';

export class UpdateNotificationDto implements Prisma.NotificationUpdateInput {
  content: string;
  timestamp?: string | Date;
  status: string;
  sender: Prisma.UserCreateNestedOneWithoutSentNotificationsInput;
  receiver: Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput;
}
