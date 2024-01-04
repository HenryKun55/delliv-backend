import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class UpdateNotificationDto implements Prisma.NotificationUpdateInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string | Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserCreateNestedOneWithoutSentNotificationsInputValidator)
  sender?: Prisma.UserCreateNestedOneWithoutSentNotificationsInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserCreateNestedOneWithoutReceivedNotificationsInputValidator)
  receiver?: Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput;
}

class UserCreateNestedOneWithoutSentNotificationsInputValidator
  implements Prisma.UserCreateNestedOneWithoutSentNotificationsInput {}

class UserCreateNestedOneWithoutReceivedNotificationsInputValidator
  implements Prisma.UserCreateNestedOneWithoutReceivedNotificationsInput {}
