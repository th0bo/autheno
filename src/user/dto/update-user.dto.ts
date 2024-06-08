import { UserDto } from '../entities/user.entity';

export type UpdateUserDto = Omit<UserDto, 'uuid' | 'username'>;
