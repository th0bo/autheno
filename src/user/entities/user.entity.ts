import {
  BaseEntity,
  Collection,
  Entity,
  EntityDTO,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/sqlite';
import { v4 as uuidv4 } from 'uuid';
import { Right } from './right.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  uuid = uuidv4();
  @Property({ unique: true })
  name!: string;
  @Property({ unique: true })
  email!: string;
  @Property()
  hashedPassword!: string;
  @OneToMany(() => Right, (right) => right.owner)
  rights = new Collection<Right>(this);
}

export type UserDto = EntityDTO<User>;
