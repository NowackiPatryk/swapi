import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, HttpClientModule],
})
export class CoreModule {}
