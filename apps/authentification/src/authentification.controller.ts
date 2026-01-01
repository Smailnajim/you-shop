import { Controller } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthentificationController {
  constructor(
    private readonly authentificationService: AuthentificationService,
  ) {}

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto): string {
    console.log(loginDto);
    return this.authentificationService.getHello();
  }
}
