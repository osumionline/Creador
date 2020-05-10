import { Component } from '@angular/core';
import { ProjectDataResult, IncludeType } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-includes',
	templateUrl: './includes.component.html',
	styleUrls: ['../../pages/project/project.component.css']
})
export class IncludesComponent {
	includeTypes: IncludeType[] = [];
	
	constructor(private as: ApiService) {}

	load(data: ProjectDataResult) {
		for (let i in this.includeTypes) {
			if (data.includes.indexOf(this.includeTypes[i].id)!=-1) {
				const opt_ind = data.includes.indexOf(this.includeTypes[i].id);
				this.includeTypes[i].selected = true;
			}
		}
	}

	setIncludeTypes(includeTypes: IncludeType[]) {
		this.includeTypes = includeTypes;
	}

	getIncludeTypes() {
		return this.includeTypes;
	}
}