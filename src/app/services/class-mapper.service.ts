import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Project } from 'src/app/model/project.model';
import {
	UserInterface,
	ProjectInterface
} from 'src/app/interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getUser(u: UserInterface): User {
		return new User().fromInterface(u);
	}

	getProjects(ps: ProjectInterface[]): Project[] {
		const projects: Project[] = [];

		for (let p of ps) {
			projects.push(this.getProject(p));
		}

		return projects;
	}

	getProject(p: ProjectInterface): Project {
		return new Project().fromInterface(p);
	}
}
