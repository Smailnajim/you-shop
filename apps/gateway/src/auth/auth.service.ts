import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

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
}
