import { Module } from '@nestjs/common';
import { SWApiClient } from './swapi.client';

@Module({
  providers: [SWApiClient],
  exports: [SWApiClient],
})
export class SWApiModule {}
