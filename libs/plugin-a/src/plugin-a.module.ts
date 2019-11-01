import { Module } from '@nestjs/common';
import { PluginAService } from './plugin-a.service';
import { PluginControllerAController } from './plugin-controller-a/plugin-controller-a.controller';

@Module({
  providers: [PluginAService],
  exports: [PluginAService],
  controllers: [PluginControllerAController],
})
export class PluginAModule { }
