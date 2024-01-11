import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { prismaExclude } from '@app/utils/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      select: prismaExclude('User', ['password']),
    });
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }
}
