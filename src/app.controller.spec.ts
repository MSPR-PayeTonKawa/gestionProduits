import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should call getHello from AppService', () => {
      const serviceSpy = jest.spyOn(appService, 'getHello');
      appController.getHello();
      expect(serviceSpy).toHaveBeenCalled();
    });

    it('should return the same value as the service', () => {
      jest.spyOn(appService, 'getHello').mockImplementation(() => 'Test World');
      expect(appController.getHello()).toBe('Test World');
    });
  });
});
