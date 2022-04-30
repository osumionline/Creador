import { Component } from '@angular/core';
import {
	ProjectDataResult
} from 'src/app/interfaces/interfaces';
import { IncludeType } from 'src/app/model/include-type.model';

@Component({
	selector: 'app-includes',
	templateUrl: './includes.component.html',
	styleUrls: ['../../pages/project/project.component.scss']
})
export class IncludesComponent {
	includeTypes: IncludeType[] = [];

	constructor() {}

	load(data: ProjectDataResult) {
		for (let i in this.includeTypes) {
			if (data.includes.indexOf(this.includeTypes[i].id)!=-1) {
				const opt_ind = data.includes.indexOf(this.includeTypes[i].id);
				if (opt_ind !== -1) {
					this.includeTypes[i].selected = true;
				}
			}
		}
	}

	setIncludeTypes(includeTypes: IncludeType[]) {
		this.includeTypes = includeTypes;
	}

	getIncludeTypes() {
		return this.includeTypes;
	}

	removeSelectedInclude(ev: MouseEvent, inc: IncludeType) {
		ev.preventDefault();
		delete inc.selected;
	}
}
