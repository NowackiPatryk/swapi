import { Module } from '@nestjs/common';
import { SWApiClient } from './swapi.client';
import { HttpClientModule } from '../../core/http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  providers: [SWApiClient],
  exports: [SWApiClient],
})
export class SWApiModule {}
