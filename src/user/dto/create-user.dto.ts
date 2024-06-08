import { UserDto } from '../entities/user.entity';

export type CreateUserDto = Required<Omit<UserDto, 'uuid'>>;
