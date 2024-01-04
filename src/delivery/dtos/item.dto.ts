import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Prisma } from '@prisma/client';

export class ItemDto implements Prisma.ItemUncheckedCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
