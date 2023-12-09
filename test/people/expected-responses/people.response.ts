import { PeopleGraphql } from '../../../src/api/graphql/models/people.graphql';

export const peopleResponse: Record<keyof PeopleGraphql, any> = {
  name: expect.toBeString(),
  height: expect.toBeString(),
  mass: expect.toBeString(),
  hair_color: expect.toBeString(),
  skin_color: expect.toBeString(),
  eye_color: expect.toBeString(),
  birth_year: expect.toBeString(),
  gender: expect.toBeString(),
  homeworld: expect.toBeString(),
  films: expect.toBeOneOf([expect.arrayContaining([expect.toBeString()]), []]),
  species: expect.toBeOneOf([
    expect.arrayContaining([expect.toBeString()]),
    [],
  ]),
  vehicles: expect.toBeOneOf([
    expect.arrayContaining([expect.toBeString()]),
    [],
  ]),
  starships: expect.toBeOneOf([
    expect.arrayContaining([expect.toBeString()]),
    [],
  ]),
  created: expect.toBeString(),
  edited: expect.toBeString(),
  url: expect.toBeString(),
};
