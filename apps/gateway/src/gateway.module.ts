import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthModule } from './auth/auth.module';
import { CatalogueModule } from './catalogue/catalogue.module';

@Module({
  imports: [AuthModule, CatalogueModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
