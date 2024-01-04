import {
  IsNotEmpty,
  IsString,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ItemDto } from './item.dto';

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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items?: Prisma.ItemUncheckedCreateNestedManyWithoutOrdersInput;
}
