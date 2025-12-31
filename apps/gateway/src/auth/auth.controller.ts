import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
