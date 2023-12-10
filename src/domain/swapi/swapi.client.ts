import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../core/http-client/services/http-client.service';
import { FilmsListResppnse, PeopleListResponse, PeopleResponse } from './types';
import { SwapiUrlBuilder } from './url-builder/url.builder';

export type FilterListParams = {
  page?: number,
  search?: string,
}

@Injectable()
export class SWApiClient {
  constructor(private readonly httpClientService: HttpClientService) {}

  async getAllPeople(params: FilterListParams): Promise<PeopleListResponse> {
    const urlBuilder = SwapiUrlBuilder.get().forPeople();

    if (params?.page) urlBuilder.withPage(params.page);
    if (params?.search) urlBuilder.withSearch(params.search);

    const url = urlBuilder.getUrl();
    return this.httpClientService.get<PeopleListResponse>(url);
  }

  async getPeopleById(id: number): Promise<PeopleResponse> {
    const url = SwapiUrlBuilder.get().forPeople().withId(id).getUrl();
    return this.httpClientService.get<PeopleResponse>(url);
  }

  async getAllFilms(params: FilterListParams): Promise<FilmsListResppnse> {
    const urlBuilder = SwapiUrlBuilder.get().forFilms();

    if (params?.page) urlBuilder.withPage(params.page);
    if (params?.search) urlBuilder.withSearch(params.search);

    const url = urlBuilder.getUrl();
    return this.httpClientService.get<FilmsListResppnse>(url);
  }
}
