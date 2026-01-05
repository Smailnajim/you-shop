import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { AuthRepository } from './authentification.repository';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, AuthRepository],
})
export class AuthentificationModule {}
