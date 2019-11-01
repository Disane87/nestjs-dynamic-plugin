import { PluginAModule } from '@c8-plugin/plugin-a';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PluginController } from './plugin/plugin.controller';

export const PLUGIN_PATH = path.normalize(path.join(process.cwd(), 'plugins'));

@Module({
  controllers: [PluginController],
})
export class PluginModule {

  public static async registerPluginsAsync(): Promise<DynamicModule> {
    return this.loadPlugins();
  }

  private static loadPlugins(): Promise<DynamicModule> {
    Logger.log(`Loading plugins from ${PLUGIN_PATH}`, 'loadPlugins');

    const loadedPlugins: Array<Promise<DynamicModule>> = new Array();
    this.searchPluginsInFolder(PLUGIN_PATH).forEach(filePath => {
      loadedPlugins.push(
        this.loadPlugin(filePath).then(module => {
          if (module) { return module; }
        }),
      );
    });

    return Promise.all(loadedPlugins).then((allPlugins: DynamicModule[]) => {
      console.log('All modules resolved: ', allPlugins.length, 'plugins');

      return {
        module: PluginModule,
        imports: [PluginAModule],
      } as DynamicModule;

    });
  }

  private static loadPlugin(path: string): Promise<DynamicModule> {
    const modulePlugin = import(path);
    return modulePlugin;
  }

  private static searchPluginsInFolder(folder: string): string[] {
    return this.recFindByExt(folder, 'mjs');
  }

  private static recFindByExt(base: string, ext: string, files?, result?): any[] {
    files = files || fs.readdirSync(base);
    result = result || [];

    files.forEach((file) => {
      const newbase = path.join(base, file);
      if (fs.statSync(newbase).isDirectory()) {
        result = this.recFindByExt(newbase, ext, fs.readdirSync(newbase), result);
      } else {
        if (file.substr(-1 * (ext.length + 1)) === '.' + ext) {
          result.push(newbase);
        }
      }
    },
    );
    return result;
  }
}

