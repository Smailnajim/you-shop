import { Controller, Get } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';

@Controller()
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  getHello(): string {
    return this.catalogueService.getHello();
  }
}
