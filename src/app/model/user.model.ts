import { UserInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class User {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public token: string | null = null,
  ) {}

  fromInterface(u: UserInterface): User {
    this.id = u.id;
    this.name = urldecode(u.name);
    this.token = urldecode(u.token);

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      token: urlencode(this.token),
    };
  }
}
