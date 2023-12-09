import { Injectable } from '@nestjs/common';
import { SWApiClient } from '../swapi/swapi.client';

@Injectable()
export class PeopleService {
  constructor(private readonly swapi: SWApiClient) {}

  async getAllPeople(page?: number) {
    return this.swapi.getAllPeople(page);
  }

  async getOneById(id: number) {
    return this.swapi.getPeopleById(id);
  }
}
