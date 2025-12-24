import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';

describe('CatalogueController', () => {
  let catalogueController: CatalogueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatalogueController],
      providers: [CatalogueService],
    }).compile();

    catalogueController = app.get<CatalogueController>(CatalogueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(catalogueController.getHello()).toBe('Hello World!');
    });
  });
});
