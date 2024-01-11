import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dtos/LoginInputDto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() input: LoginInputDto) {
    const user = await this.authService.validateAdminUser(input);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() input: LoginInputDto) {
    const user = await this.authService.validateUser(input);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }
}
