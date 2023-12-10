import { Injectable } from '@nestjs/common';
import { GetAllPeopleParams, SWApiClient } from '../../swapi/swapi.client';
import { UnallowedFiltersException } from '../exceptions/unallowed-filters.exception';
import { PeopleCacheService } from './people-cache.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly swapi: SWApiClient,
    private readonly cache: PeopleCacheService,
  ) {}

  async getAllPeople(params: GetAllPeopleParams) {
    const { page, search } = params;

    if (page && search) {
      throw new UnallowedFiltersException(
        'Page and search parameters can not be used at the same time',
      );
    }

    const cached = await this.cache.getPeopleListResponse(params);
    if (cached) return cached;

    const response = await this.swapi.getAllPeople(params);
    await this.cache.cachePeopleListResponse({
      recentlyUsedFilters: params,
      response,
    });

    return response;
  }

  async getOneById(id: number) {
    const cached = await this.cache.getPeopleByIdResponse(id);
    if (cached) return cached;

    const response = await this.swapi.getPeopleById(id);
    await this.cache.cachePeopleResponse({
      recentlyUsedId: id,
      response,
    });

    return response;
  }
}
