import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginInputDto } from './dtos/LoginInputDto';
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdminUser(input: LoginInputDto): Promise<any> {
    const user = await this.userService.getUserByUsername(input.username);
    if (user.role !== Role.ESTABLISHMENT || !user.establishmentId)
      throw new HttpException(
        'This user is not authorized',
        HttpStatus.UNAUTHORIZED,
      );

    if (user && (await bcrypt.compare(input.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser(input: LoginInputDto): Promise<any> {
    const user = await this.userService.getUserByUsername(input.username);
    if (user.role !== Role.DELIVERY_MAN)
      throw new HttpException(
        'This user is not authorized',
        HttpStatus.UNAUTHORIZED,
      );

    if (user && (await bcrypt.compare(input.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign(user),
      user,
    };
  }
}
