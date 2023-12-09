import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { PeopleGraphql } from '../../../src/api/graphql/models/people.graphql';

export type PeopleListResponse = {
  getAllPeople: { results: PeopleGraphql[]; errors?: { statusCode: number } };
};
type GetAllPeopleFilters = {
  page?: number;
  search?: string;
};

export const getAllPeopleQuery = async (
  app: INestApplication,
  filters?: GetAllPeopleFilters,
) => {
  const query = gql`
    query getALlPeople($input: GetAllPeopleInput!) {
      getAllPeople(GetAllPeopleInput: $input) {
        results {
          name
          height
          mass
          hair_color
          skin_color
          eye_color
          birth_year
          gender
          homeworld
          films
          species
          vehicles
          starships
          created
          edited
          url
        }
        previous
        next
        count
      }
    }
  `;

  return request<PeopleListResponse>(app.getHttpServer())
    .query(query)
    .variables({ input: filters || {}});
};
