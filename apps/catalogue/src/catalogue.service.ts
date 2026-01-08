import { Injectable } from '@nestjs/common';
import { CatalogueRepository } from './catalogue.repository';

@Injectable()
export class CatalogueService {
  constructor(private readonly catalogueRepository: CatalogueRepository) {}

  async findAll() {
    return this.catalogueRepository.findAll();
  }
}
