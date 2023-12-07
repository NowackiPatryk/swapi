import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { DomainModule } from '../domain/domain.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [CoreModule, ApiModule, DomainModule, AppConfigModule],
})
export class AppModule {}
