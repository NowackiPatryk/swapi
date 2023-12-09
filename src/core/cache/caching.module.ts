import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { DatabaseConfig } from '../database/config/database-config';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [DatabaseModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => {
        return {
          isGlobal: true,
          store: redisStore as unknown as CacheStore,
          host: databaseConfig.databaseHost,
          port: databaseConfig.databasePort,
        };
      },
    }),
    DatabaseModule,
  ],
})
export class CachingModule {}