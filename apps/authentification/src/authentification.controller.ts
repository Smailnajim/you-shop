import { Controller, Get } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

@Controller()
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Get()
  getHello(): string {
    return this.authentificationService.getHello();
  }
}
