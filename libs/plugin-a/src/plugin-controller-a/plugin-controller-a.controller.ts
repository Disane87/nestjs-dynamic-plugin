import { Controller, Get } from '@nestjs/common';

@Controller('plugin-controller-a')
export class PluginControllerAController {
    @Get()
    test() {
        return 'works';
    }
}
