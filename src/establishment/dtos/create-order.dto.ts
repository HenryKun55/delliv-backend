import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { CreateItemDto } from './create-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  // @IsOptional()
  // @IsDateString()
  // timestamp?: string | Date;
  //
  // @IsArray()
  // @ValidateNested({ each: true })
  // @ArrayMinSize(1)
  // @ArrayMaxSize(3)
  // @Type(() => CreateItemDto)
  // items: CreateItemDto[];
  //
  // @IsNotEmpty()
  // @IsEnum(() => OrderStatus)
  // status: OrderStatus;
}
