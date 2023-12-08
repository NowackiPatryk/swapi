import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../core/http-client/services/http-client.service';
import { PeopleListResponse, PeopleResponse } from './types';
import { SwapiUrlBuilder } from './url-builder/url.builder';

@Injectable()
export class SWApiClient {
  constructor(private readonly httpClientService: HttpClientService) {}

  async getAllPeople(page?: number): Promise<PeopleListResponse> {
    const urlBuilder = SwapiUrlBuilder.get().forPeople();

    if (page) urlBuilder.withPage(page);

    const url = urlBuilder.getUrl();
    return this.httpClientService.get<PeopleListResponse>(url);
  }

  async getPeopleById(id: number): Promise<PeopleResponse> {
    const url = SwapiUrlBuilder.get().forPeople().withId(id).getUrl();
    return this.httpClientService.get<PeopleResponse>(url);
  }
}
