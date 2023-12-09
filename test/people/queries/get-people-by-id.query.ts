import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { PeopleGraphql } from '../../../src/api/graphql/models/people.graphql';

export type PeopleResponse = { getPeopleById: PeopleGraphql };

export const getPeopleByIdQuery = async (app: INestApplication, id: number) => {
  const query = gql`
  query getOneById($id: Int!) {
    getPeopleById(id: $id) {
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
  }
  `;

  return request<PeopleResponse>(app.getHttpServer())
    .query(query)
    .variables({ id });
};
