import { Injectable } from '@nestjs/common';
import { registerDTO } from './dto/register.dto';

@Injectable()
export class AuthentificationService {
  getHello(): string {
    return 'Hello World!';
  }

  register(registerData: registerDTO) {
    console.log(registerData);
    
  }
}
