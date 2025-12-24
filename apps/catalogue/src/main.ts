import { NestFactory } from '@nestjs/core';
import { CatalogueModule } from './catalogue.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogueModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
