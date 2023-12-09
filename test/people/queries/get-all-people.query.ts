import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { PeopleGraphql } from '../../../src/api/graphql/models/people.graphql';

export type PeopleListResponse = { getAllPeople: { results: PeopleGraphql[] } };

export const getAllPeopleQuery = async (
  app: INestApplication,
  page?: number,
) => {
  const query = page
    ? gql`
        query getAllPeople($page: Int!) {
          getAllPeople(page: $page) {
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
      `
    : gql`
        query getAllPeople {
          getAllPeople {
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

  const variables = {};
  if (page) variables['page'] = page;

  return request<PeopleListResponse>(app.getHttpServer())
    .query(query)
    .variables(variables);
};
