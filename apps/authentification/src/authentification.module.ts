import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
// import { PrismaModule } from './prisma/prisma.module';
import { AuthRepository } from './authentification.repository';

@Module({
  imports: [],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, AuthRepository],
})
export class AuthentificationModule {}
