import * as url from 'url';
import { PeopleFilters } from '../types';

enum PossibleResources {
  PEOPLE = 'people',
}

type ResourceBuildingStep = Pick<SwapiUrlBuilder, 'forPeople'>;
type FilterBuildingStep = Pick<
  SwapiUrlBuilder,
  'getUrl' | 'withId' | 'withPage' | 'withSearch'
>;
type GetAllBuildingStep = Pick<
  SwapiUrlBuilder,
  'withPage' | 'withSearch' | 'getUrl'
>;

type FinalBuildingStep = Pick<SwapiUrlBuilder, 'getUrl'>;

export class SwapiUrlBuilder {
  private readonly baseUrl = 'https://swapi.dev/api';
  private path = '';
  private query = {};

  static get(): ResourceBuildingStep {
    return new SwapiUrlBuilder();
  }

  forPeople(): FilterBuildingStep {
    this.path += `/${PossibleResources.PEOPLE}`;
    return this;
  }

  withId(id: number): GetAllBuildingStep {
    this.path += `/${id}`;
    return this;
  }

  withPage(page: number): FinalBuildingStep {
    this.query['page'] = page;
    return this;
  }

  withSearch(search: string): FinalBuildingStep {
    this.query['search'] = search;
    return this;
  }

  getUrl(): string {
    return url.format({
      host: this.baseUrl,
      pathname: this.path,
      query: this.query,
    });
  }
}
