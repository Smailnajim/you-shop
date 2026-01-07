import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { AuthRepository } from './authentification.repository';
import { PrismaModule } from './prisma/prisma.module';
import { TokenService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, AuthRepository, TokenService],
})
export class AuthentificationModule {}
