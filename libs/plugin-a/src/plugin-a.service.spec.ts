import { Test, TestingModule } from '@nestjs/testing';
import { PluginAService } from './plugin-a.service';

describe('PluginAService', () => {
  let service: PluginAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PluginAService],
    }).compile();

    service = module.get<PluginAService>(PluginAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
