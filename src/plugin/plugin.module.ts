import { DynamicModule, Logger, Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { of } from 'rxjs';
import { PluginController } from './plugin/plugin.controller';

export const PLUGIN_PATH = path.normalize(path.join(process.cwd(), 'plugins'));

@Module({
  controllers: [PluginController],
})
export class PluginModule {

  static async registerPluginsAsync(): Promise<DynamicModule> {
    return this.loadPlugins();
  }

  private static loadPlugin(path: string): Promise<DynamicModule> {
    const modulePlugin = require(path);
    debugger;
    return of(modulePlugin).toPromise();
    // .then((module: DynamicModule) => {
    //   Logger.debug(`Loaded module from ${module}`, 'loadPlugins');
    //   return module;
    // }, error => {
    //   Logger.error(`Error loading plugins: ${error}`, 'loadPlugins');
    //   return null;
    // });
  }
  private static searchPluginsInFolder(folder: string): string[] {
    return this.recFindByExt(folder, 'js');

  }

  private static loadPlugins(): Promise<DynamicModule> {
    Logger.log(`Loading plugins from ${PLUGIN_PATH}`, 'loadPlugins');
    // Logger.log(`Current directory ${__dirname}`, 'loadPlugins');

    const loadedPlugins: Array<Promise<DynamicModule>> = new Array();

    // const plugins = this.searchPluginsInFolder(PLUGIN_PATH);

    // glob(PLUGIN_PATH + '/**/index.js', {}, (err, files) => {

    //   Logger.log(`Found files ${files.length}`, 'loadPlugins');
    //   files.forEach(file => {

    //     Logger.log(`Found plugins ${file}`, 'loadPlugins');

    //   });
    // });
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
        imports: [...allPlugins],
      } as DynamicModule;

    });

    // return Promise.all(loadedPlugins).then(pluginModules => {
    //   console.log('Loaded plugins: ', pluginModules);
    //   return pluginModules;
    // });

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

