import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from '@prisma/client';
import { prismaExclude } from '@app/utils/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      select: prismaExclude('User', ['password']),
    });
  }

  async createUser(input: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const { password, ...user } = await this.prismaService.user.create({
      data: {
        username: input.username,
        password: hashedPassword,
        role: input.role || Role.DELIVERY_MAN,
      },
    });

    return user;
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }
}
