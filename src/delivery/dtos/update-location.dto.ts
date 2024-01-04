import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLocationDto implements Prisma.DeliveryPersonUpdateInput {
  @IsNotEmpty()
  @IsString()
  location: string;
}
