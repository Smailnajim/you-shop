import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogueService {
  constructor() {
    console.log(process.env['CATALOGUE_DATABASE_URL']);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
