import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';
import { CatalogueRepository } from './catalogue.repository';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService, CatalogueRepository],
})
export class CatalogueModule {}
