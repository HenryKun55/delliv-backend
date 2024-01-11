import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginInputDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
