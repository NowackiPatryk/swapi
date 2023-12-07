import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app/app.module';
import request from 'supertest-graphql';
import gql from 'graphql-tag';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return hello world', async () => {
    const result = await request<{ hello: string }>(app.getHttpServer()).query(
      gql`
        query {
          hello
        }
      `,
    );

    expect(result.data.hello).toBe('Hello World!');
  });
});
