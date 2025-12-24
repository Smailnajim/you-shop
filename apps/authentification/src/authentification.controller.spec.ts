import { Test, TestingModule } from '@nestjs/testing';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';

describe('AuthentificationController', () => {
  let authentificationController: AuthentificationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthentificationController],
      providers: [AuthentificationService],
    }).compile();

    authentificationController = app.get<AuthentificationController>(AuthentificationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authentificationController.getHello()).toBe('Hello World!');
    });
  });
});
