import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { HttpClientModule } from './http-client/http-client.module';
import { CachingModule } from './cache/caching.module';

@Module({
  imports: [ConfigurationModule, HttpClientModule, CachingModule],
})
export class CoreModule {}
