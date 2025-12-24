import { NestFactory } from '@nestjs/core';
import { AuthentificationModule } from './authentification.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthentificationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
