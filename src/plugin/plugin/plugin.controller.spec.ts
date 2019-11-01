import { Test, TestingModule } from '@nestjs/testing';
import { PluginController } from './plugin.controller';

describe('Plugin Controller', () => {
  let controller: PluginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PluginController],
    }).compile();

    controller = module.get<PluginController>(PluginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
