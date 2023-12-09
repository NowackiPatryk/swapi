import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PeopleModule } from '../../src/domain/people/people.module';
import { PeopleResolver } from '../../src/api/gateway/resolvers/people/people.resolver';
import { getAllPeopleQuery } from './queries/get-all-people.query';
import { GraphqlModule } from '../../src/api/graphql/graphql.module';
import { peopleListResponse } from './expected-responses/people-list.response';
import { peopleResponse } from './expected-responses/people.response';
import { getPeopleByIdQuery } from './queries/get-people-by-id.query';

describe('People (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GraphqlModule, PeopleModule],
      providers: [PeopleResolver],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return list of people', async () => {
    const { response, data } = await getAllPeopleQuery(app);
    expect(response.status).toEqual(HttpStatus.OK);
    expect(data.getAllPeople).toEqual(
      expect.objectContaining(peopleListResponse),
    );
  });

  it('Should return list of people by page', async () => {
    const { response, data } = await getAllPeopleQuery(app, { page: 2 });
    expect(response.status).toEqual(HttpStatus.OK);
    expect(data.getAllPeople).toEqual(
      expect.objectContaining(peopleListResponse),
    );
  });

  it('Should return list of people filtered by search', async () => {
    const { response, data } = await getAllPeopleQuery(app, {
      search: 'Darth',
    });
    expect(response.status).toEqual(HttpStatus.OK);
    expect(data.getAllPeople).toEqual(
      expect.objectContaining(peopleListResponse),
    );
  });

  it('Should throw bad request if page and filters used at the same time', async () => {
    const { errors } = await getAllPeopleQuery(app, {
      search: 'Darth',
      page: 1,
    });
    expect(errors).toBeDefined();
    expect(errors[0].extensions.statusCode === 400);
  });

  it('Should return people by id', async () => {
    const { response, data } = await getPeopleByIdQuery(app, 1);
    expect(response.status).toEqual(HttpStatus.OK);
    expect(data.getPeopleById).toEqual(expect.objectContaining(peopleResponse));
  });
});
