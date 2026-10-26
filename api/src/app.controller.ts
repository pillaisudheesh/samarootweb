import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({
    summary: 'Check API health',
  })
  getHealth() {
    return {
      status: 'ok',
      service: 'samaroot-marketing-api',
    };
  }
}
