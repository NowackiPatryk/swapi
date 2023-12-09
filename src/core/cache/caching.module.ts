import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { DatabaseConfig } from '../database/config/database-config';
import { DatabaseModule } from '../database/database.module';
import { CachingService } from './services/caching.service';

const HOURS24 = 24 * 1000 * 60 * 60;

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [DatabaseModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => {
        return {
          isGlobal: true,
          store: redisStore as unknown as CacheStore,
          legacyMode: true,
          socket: {
            host: databaseConfig.databaseHost,
            port: +databaseConfig.databasePort,
          },
          ttl: HOURS24,
        };
      },
    }),
    DatabaseModule,
  ],

  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}