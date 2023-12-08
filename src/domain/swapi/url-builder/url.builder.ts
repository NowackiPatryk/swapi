import * as url from 'url';

enum PossibleResources {
  PEOPLE = 'people'
}

type FirstBuildingStep = Pick<SwapiUrlBuilder, 'forPeople'>;
type SecondBuildingStep = Pick<
  SwapiUrlBuilder,
  'getUrl' | 'withId' | 'withPage'
>;
type ThirdBuildingStep = Pick<SwapiUrlBuilder, 'getUrl'>;

export class SwapiUrlBuilder {
  private readonly baseUrl = 'https://swapi.dev/api';
  private path = '';
  private query = {};

  static get(): FirstBuildingStep {
    return new SwapiUrlBuilder();
  }

  forPeople(): SecondBuildingStep {
    this.path += `/${PossibleResources.PEOPLE}`;
    return this;
  }

  withId(id: number): ThirdBuildingStep {
    this.path += `/${id}`;
    return this;
  }

  withPage(page: number): ThirdBuildingStep {
    this.query['page'] = page;
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
