import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../core/http-client/services/http-client.service';
import { PeopleListResponse, PeopleResponse } from './types';
import { SwapiUrlBuilder } from './url-builder/url.builder';

@Injectable()
export class SWApiClient {
  constructor(private readonly httpClientService: HttpClientService) {
    this.getPeopleById(1).then((data) => console.log(data));
  }

  async getAllPeople(): Promise<PeopleListResponse> {
    const url = SwapiUrlBuilder.get().forPeople().getUrl();
    return this.httpClientService.get<PeopleListResponse>(url);
  }

  async getPeopleById(id: number): Promise<PeopleResponse> {
    const url = SwapiUrlBuilder.get().forPeople().withId(id).getUrl();
    return this.httpClientService.get<PeopleResponse>(url);
  }
}
