import { UserInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class User {
	constructor(
		public id: number = null,
		public name: string = null,
		public token: string = null
	) {}

	fromInterface(u: UserInterface): User {
		this.id = u.id;
		this.name = Utils.urldecode(u.name);
		this.token = Utils.urldecode(u.token);
		
		return this;
	}

	toInterface(): UserInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			token: Utils.urlencode(this.token)
		};
	}
}