import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T = unknown>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<T> {
    const response = this.httpService.get<T>(url, options);
    const { data } = await lastValueFrom(response);

    return data;
  }
}
