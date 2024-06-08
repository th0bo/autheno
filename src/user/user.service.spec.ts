import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService, UserServiceDto } from './user.service';

describe('UserService', () => {
  let service: UserService;

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
      providers: [UserService],
    }).compile();

    const orm = module.get<MikroORM>(MikroORM);
    await orm.schema.refreshDatabase();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user, then find it', async () => {
    const body: UserServiceDto = {
      email: 'a.b@c.d',
      name: 'Ab',
      password: 'abcd1234',
      rights: ['read', 'write'],
    };

    const uuid = await service.create(body);
    expect(uuid).toBeDefined();
    const user = (await service.findOne(uuid)).toObject();
    expect(user).toBeDefined();
  });
});
