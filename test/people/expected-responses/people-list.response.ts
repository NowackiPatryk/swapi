import { PeopleListGraphql } from '../../../src/api/graphql/models/people.graphql';
import { peopleResponse } from './people.response';

export const peopleListResponse: Record<keyof PeopleListGraphql, any> = {
  count: expect.any(Number),
  next: expect.toBeOneOf([expect.any(String), null]),
  previous: expect.toBeOneOf([expect.any(String), null]),
  results: expect.arrayContaining([expect.objectContaining(peopleResponse)]),
};
