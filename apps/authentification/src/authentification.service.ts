import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthentificationService {
  getHello(): string {
    return 'Hello World!';
  }
}
