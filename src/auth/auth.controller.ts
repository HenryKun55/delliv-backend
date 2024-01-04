import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/user/dtos/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: CreateUserDto) {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }) {
    return req.user;
  }
}
