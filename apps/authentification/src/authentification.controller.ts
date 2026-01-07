import { Controller } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthentificationController {
  constructor(
    private readonly authentificationService: AuthentificationService,
  ) {}

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto) {
    return this.authentificationService.login(loginDto);
  }

  @MessagePattern('register')
  async register(@Payload() registerDto: RegisterDto) {
    return await this.authentificationService.register(registerDto);
  }
}
