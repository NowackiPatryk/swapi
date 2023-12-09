import { SwapiUrlBuilder } from './url.builder';

describe('SwapiUrlBuilder', () => {
  it('Should return correct URL for all list of people', () => {
    const expected = `https://swapi.dev/api/people`;
    const result = SwapiUrlBuilder.get().forPeople().getUrl();

    expect(result).toBe(expected);
  });

  it('Should return correct URL for list including page', () => {
    const expected = 'https://swapi.dev/api/people?page=1';
    const result = SwapiUrlBuilder.get().forPeople().withPage(1).getUrl();

    expect(result).toBe(expected);
  });

  it('Should return correct URL for list including search', () => {
    const expected = 'https://swapi.dev/api/people?search=Luke';
    const result = SwapiUrlBuilder.get()
      .forPeople()
      .withSearch('Luke')
      .getUrl();

    expect(result).toBe(expected);
  });

  it('Should return correct URL for getting single resource including ID', () => {
    const expected = 'https://swapi.dev/api/people/1';
    const result = SwapiUrlBuilder.get().forPeople().withId(1).getUrl();

    expect(result).toBe(expected);
  });
});
