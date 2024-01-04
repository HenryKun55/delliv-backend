import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class CreateNotificationDto implements Prisma.NotificationCreateInput {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string | Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @ValidateNested()
  @Type(() => UserCreateNestedOneWithoutSentNotificationsInputValidator)
  sender: Prisma.UserCreateNestedOneWithoutSentNotificationsInput;

  @ValidateNested()
  @Type(() => UserCreateNestedOneWithoutReceivedNotificationsInputValidator)
  receiver: Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput;
}

class UserCreateNestedOneWithoutSentNotificationsInputValidator
  implements Prisma.UserCreateNestedOneWithoutSentNotificationsInput {}

class UserCreateNestedOneWithoutReceivedNotificationsInputValidator
  implements Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput {}
