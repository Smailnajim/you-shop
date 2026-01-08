import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';
import type { UserPayload } from './decorators';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  Login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  /**
   *example for endpoint protected
   */
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return {
      success: true,
      message: 'Profile retrieved successfully',
      user,
    };
  }

  /**
   *example for getting specific field from user data
   */
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@CurrentUser('email') email: string, @CurrentUser('role') role: string) {
    return {
      success: true,
      email,
      role,
    };
  }
}

