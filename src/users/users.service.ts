import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 0,
      name: 'Bob',
      email: 'bob@gmail.com',
      password: '$argon2id$v=19$m=65536,t=3,p=4$T49g9kOxNTInNwmp2yt0tw$Sc/1UbL5hfn3EaXgNndNaqL9Ch9PdWtECyMw3timDc0',
    },

    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      password: 'johnPass',
    },

    {
      id: 2,
      name: 'Gary',
      email: 'gary@gmail.com',
      password: 'garyPass',
    },
  ];

  findByEmail(email: string): Promise<User | undefined> {
   const user = this.users.find((user) => user.email === email);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(id: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
