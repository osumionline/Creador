import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Project } from 'src/app/model/project.model';
import { Model } from 'src/app/model/model.model';
import { IncludeType } from 'src/app/model/include-type.model';
import {
	UserInterface,
	ProjectInterface,
	ModelInterface,
	IncludeTypeInterface
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

	getModels(ms: ModelInterface[]): Model[] {
		const models: Model[] = [];

		for (let m of ms) {
			models.push(this.getModel(m));
		}

		return models;
	}

	getModel(m: ModelInterface): Model {
		return new Model().fromInterface(m);
	}

	getIncludeTypes(its: IncludeTypeInterface[]): IncludeType[] {
		const includeTypes: IncludeType[] = [];

		for (let it of its) {
			includeTypes.push(this.getIncludeType(it));
		}

		return includeTypes;
	}

	getIncludeType(it: IncludeTypeInterface): IncludeType {
		return new IncludeType().fromInterface(it);
	}
}
