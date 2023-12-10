import { Injectable } from '@nestjs/common';
import { FilterListParams, SWApiClient } from '../../swapi/swapi.client';

@Injectable()
export class FilmService {
  constructor(private readonly swapiClient: SWApiClient) {}

  async getAllFilms(filters?: FilterListParams) {
    return this.swapiClient.getAllFilms(filters);
  }
}
