import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../core/http-client/services/http-client.service';
import { PeopleFilters, PeopleListResponse, PeopleResponse } from './types';
import { SwapiUrlBuilder } from './url-builder/url.builder';

export type GetAllPeopleParams = {
  page?: number,
  search?: string,
}

@Injectable()
export class SWApiClient {
  constructor(private readonly httpClientService: HttpClientService) {}

  async getAllPeople(params: GetAllPeopleParams): Promise<PeopleListResponse> {
    const { page, search } = params;
    const urlBuilder = SwapiUrlBuilder.get().forPeople();

    if (page) urlBuilder.withPage(page);
    if (search) urlBuilder.withSearch(search);

    const url = urlBuilder.getUrl();
    return this.httpClientService.get<PeopleListResponse>(url);
  }

  async getPeopleById(id: number): Promise<PeopleResponse> {
    const url = SwapiUrlBuilder.get().forPeople().withId(id).getUrl();
    return this.httpClientService.get<PeopleResponse>(url);
  }
}
