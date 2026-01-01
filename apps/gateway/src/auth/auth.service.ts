import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login(loginDto: LoginDto) {
    console.log('Sending to Auth Microservice:', {
      pattern: 'login',
      data: loginDto,
    });
    return this.authClient.send('login', loginDto);
  }
  register(registerData: RegisterDto) {
    console.log('Sending to Auth Microservice:', {
      pattern: 'register',
      data: registerData,
    });
    return this.authClient.send('register', registerData);
  }
}
