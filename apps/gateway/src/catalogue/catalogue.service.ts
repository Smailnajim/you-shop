import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject('CATALOGUE_CLIENT') private catalogueClient: ClientProxy,
  ) {}
}
