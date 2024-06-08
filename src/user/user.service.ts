import { MikroORM } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Right } from './entities/right.entity';
import { User } from './entities/user.entity';

export type UserServiceDto = Omit<CreateUserDto, 'hashedPassword'> & {
  password: string;
  rights: string[];
};

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(private readonly orm: MikroORM) {}

  async create({ name: username, email, password, rights }: UserServiceDto) {
    const hashedPassword = hashSync(password, this.saltRounds);
    const em = this.orm.em.fork();
    const user = new User();
    user.name = username;
    user.email = email;
    user.hashedPassword = hashedPassword;
    for (const name of rights) {
      const right = new Right();
      right.name = name;
      user.rights.add(right);
    }
    em.persist(user);
    await em.flush();
    return user.uuid;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(uuid: string) {
    const em = this.orm.em.fork();
    return em.findOne(User, { uuid }, { populate: ['rights'] });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${uuid} user`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
