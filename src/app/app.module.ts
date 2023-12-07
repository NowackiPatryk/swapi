import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { DomainModule } from '../domain/domain.module';
import { AppConfig } from './config/app-config';

@Module({
  providers: [AppConfig],
  imports: [CoreModule, ApiModule, DomainModule],
})
export class AppModule {}
