import { Prisma } from '@prisma/client';

export class CreateNotificationDto implements Prisma.NotificationCreateInput {
  content: string;
  timestamp?: string | Date;
  status: string;
  sender: Prisma.UserCreateNestedOneWithoutSentNotificationsInput;
  receiver: Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput;
}
