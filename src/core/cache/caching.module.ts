import {
  CacheModule, CacheStore,
} from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { StoreConfig } from './store/config/store-config';
import { CachingService } from './services/caching.service';
import { StoreModule } from './store/store.module';
import { redisStore } from 'cache-manager-redis-store';

const HOURS24 = 24 * 1000 * 60 * 60;

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [StoreModule],
      inject: [StoreConfig],
      useFactory: async (storeConfig: StoreConfig) => {
        return {
          isGlobal: true,
          // store: (await redisStore({
          //   legacyMode: true,
          //   socket: {
          //     host: storeConfig.databaseHost,
          //     port: +storeConfig.databasePort,
          //   },
          // })) as unknown as CacheStore,
          ttl: HOURS24,
        };
      },
    }),
    StoreModule,
  ],

  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
