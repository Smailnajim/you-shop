import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Login(@Body() loginDto: any) { 
    return this.authService.login(loginDto);
  }
}
