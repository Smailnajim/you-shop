import { Controller } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @MessagePattern('findAll')
  findAll() {
    return this.catalogueService.findAll();
  }
}
