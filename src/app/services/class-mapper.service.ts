import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserInterface } from 'src/app/interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getUser(u: UserInterface): User {
		return new User().fromInterface(u);
	}
}
