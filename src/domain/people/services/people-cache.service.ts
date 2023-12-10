import { Injectable } from '@nestjs/common';
import { CachingService } from '../../../core/cache/services/caching.service';
import { PeopleListResponse, PeopleResponse } from '../../swapi/types';
import { GetAllPeopleParams } from '../../swapi/swapi.client';

export type CachedPeopleListResponse = {
  recentlyUsedFilters: GetAllPeopleParams;
  response: PeopleListResponse;
};

export type CachedPeopleResponse = {
  recentlyUsedId: number;
  response: PeopleResponse;
};

@Injectable()
export class PeopleCacheService {
  static PEOPLE_LIST_CACHE_KEY = 'PEOPLE_LIST';
  static PEOPLE_CACHE_KEY = 'PEOPLE';

  constructor(private readonly cachingService: CachingService) {}

  async cachePeopleListResponse(response: CachedPeopleListResponse) {
    const currentCache =
      (await this.cachingService.get<CachedPeopleListResponse[]>(
        PeopleCacheService.PEOPLE_LIST_CACHE_KEY,
      )) || [];

    const alreadyCached = currentCache.some(
      (cachedResponse) =>
        cachedResponse.recentlyUsedFilters.page ===
          response.recentlyUsedFilters.page &&
        cachedResponse.recentlyUsedFilters.search ===
          response.recentlyUsedFilters.search,
    );

    if (!alreadyCached) {
      await this.cachingService.set<CachedPeopleListResponse[]>(
        PeopleCacheService.PEOPLE_LIST_CACHE_KEY,
        [...currentCache, response],
      );
    }
  }

  async cachePeopleResponse(response: CachedPeopleResponse) {
    const currentCache =
      (await this.cachingService.get<CachedPeopleResponse[]>(
        PeopleCacheService.PEOPLE_CACHE_KEY,
      )) || [];

    const alreadyCached = currentCache.some(
      (peopleResponse) =>
        peopleResponse.recentlyUsedId === response.recentlyUsedId,
    );

    if (!alreadyCached) {
      await this.cachingService.set<CachedPeopleResponse[]>(
        PeopleCacheService.PEOPLE_CACHE_KEY,
        [...currentCache, response],
      );
    }
  }

  async getPeopleListResponse(
    filters: GetAllPeopleParams,
  ): Promise<PeopleListResponse> {
    const { page, search } = filters;

    const currentCache =
      (await this.cachingService.get<CachedPeopleListResponse[]>(
        PeopleCacheService.PEOPLE_LIST_CACHE_KEY,
      )) || [];

    return currentCache.find(
      (cached) =>
        cached.recentlyUsedFilters.page === page &&
        cached.recentlyUsedFilters.search === search,
    )?.response;
  }

  async getPeopleByIdResponse(id: number): Promise<PeopleResponse> {
    const currentCache =
      (await this.cachingService.get<CachedPeopleResponse[]>(
        PeopleCacheService.PEOPLE_CACHE_KEY,
      )) || [];

    return currentCache.find((cached) => cached.recentlyUsedId === id)
      ?.response;
  }
}
