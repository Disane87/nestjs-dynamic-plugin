import { Test, TestingModule } from '@nestjs/testing';
import { PluginControllerAController } from './plugin-controller-a.controller';

describe('PluginControllerA Controller', () => {
  let controller: PluginControllerAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PluginControllerAController],
    }).compile();

    controller = module.get<PluginControllerAController>(PluginControllerAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
