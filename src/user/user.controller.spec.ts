import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService, UserServiceDto } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          dbName: 'my-db-name.sqlite3',
          driver: SqliteDriver,
        }),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    const orm = module.get<MikroORM>(MikroORM);
    await orm.schema.refreshDatabase();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const body: UserServiceDto = {
      email: 'a.b@c.d',
      name: 'Ab',
      password: 'abcd1234',
      rights: ['read', 'write'],
    };

    expect(await controller.create(body)).toBe('This action adds a new user');
  });
});
