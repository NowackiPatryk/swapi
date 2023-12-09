import { Injectable } from '@nestjs/common';
import { GetAllPeopleParams, SWApiClient } from '../swapi/swapi.client';
import { UnallowedFiltersException } from './exceptions/unallowed-filters.exception';

@Injectable()
export class PeopleService {
  constructor(private readonly swapi: SWApiClient) {}

  async getAllPeople(params: GetAllPeopleParams) {
    const { page, search } = params;

    if (page && search) {
      throw new UnallowedFiltersException(
        'Page and search parameters can not be used at the same time',
      );
    }

    return this.swapi.getAllPeople(params);
  }

  async getOneById(id: number) {
    return this.swapi.getPeopleById(id);
  }
}
