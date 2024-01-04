import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class OrderDto implements Prisma.OrderUncheckedCreateInput {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsDateString()
  timestamp?: string | Date;

  @IsNotEmpty()
  @IsString()
  establishmentId: string;

  @IsNotEmpty()
  @IsString()
  deliveryPersonId?: string;
}
