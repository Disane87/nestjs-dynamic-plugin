import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PluginModule } from './plugin/plugin.module';

@Module({
  imports: [PluginModule.registerPluginsAsync()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
