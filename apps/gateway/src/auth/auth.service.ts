import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login(loginDto: any) {
    return this.authClient.send('login', loginDto);
  }
}
