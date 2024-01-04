import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/user/dtos/create-user.dto';

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
}
