import { Injectable } from '@nestjs/common';
import { registerDTO } from './dto/register.dto';
import { AuthRepository } from './authentification.repository';

@Injectable()
export class AuthentificationService {
  constructor(private readonly authRepository: AuthRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  register(registerData: registerDTO) {
    console.log(registerData);

  }
}
