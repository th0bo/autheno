import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
} from '@mikro-orm/sqlite';
import { User } from './user.entity';

@Entity()
export class Right {
  @PrimaryKey()
  name!: string;
  @ManyToOne({ lazy: true })
  owner!: User;
  [PrimaryKeyProp]?: ['label', 'owner'];
}
