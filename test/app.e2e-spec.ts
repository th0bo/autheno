import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceDto } from 'src/user/user.service';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user (POST)', () => {
    const body: UserServiceDto = {
      email: 'a.b@c.d',
      name: 'Ab',
      password: 'abcd1234',
    };
    return request(app.getHttpServer())
      .post('/user')
      .send(body)
      .expect(200)
      .expect('This action adds a new user');
  });
});
