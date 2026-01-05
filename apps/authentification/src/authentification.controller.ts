import { Controller } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthentificationController {
  constructor(
    private readonly authentificationService: AuthentificationService,
  ) {}

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authentificationService.getHello();
  }

  @MessagePattern('register')
  async register(@Payload() registerDto: RegisterDto) {
    console.log('choooooooooof', registerDto);
    const user = await this.authentificationService.register(registerDto);
    return user;
  }
}
