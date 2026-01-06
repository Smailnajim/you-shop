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
    try {
      console.log('choooooooooof', registerDto);
      const user = await this.authentificationService.register(registerDto);
      console.log('ffffff');
      return user;
    } catch (error) {
      console.log(error.message);
      return { message: error.message };
    }
  }
}
