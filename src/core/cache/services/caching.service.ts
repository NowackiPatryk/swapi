import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set<T = unknown>(key: string, val: T) {
    return this.cacheManager.set(key, val);
  }

  async get<T = unknown>(key: string): Promise<T> {
    return this.cacheManager.get(key);
  }
}
