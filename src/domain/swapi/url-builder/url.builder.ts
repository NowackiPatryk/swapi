import * as url from 'url';

enum PossibleResources {
  PEOPLE = 'people',
  FILMS = 'films',
}

type ResourceBuildingStep = Pick<SwapiUrlBuilder, 'forPeople' | 'forFilms'>;
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
  private readonly baseUrl = 'https://swapi.dev/api/';
  private resource: PossibleResources | null = null;
  private path = '';
  private query = {};

  static get(): ResourceBuildingStep {
    return new SwapiUrlBuilder();
  }

  forPeople(): FilterBuildingStep {
    this.resource = PossibleResources.PEOPLE;
    return this;
  }

  forFilms(): FilterBuildingStep {
    this.resource = PossibleResources.FILMS;
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
      pathname: this.getFullPath(),
      query: this.query,
    });
  }

  private getFullPath() {
    return `${this.resource}` + (this.path.length ? `${this.path}` : '');
  }
}
