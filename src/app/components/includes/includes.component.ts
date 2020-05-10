import { Component } from '@angular/core';
import { ProjectDataResult, IncludeType } from '../../interfaces/interfaces';

@Component({
	selector: 'app-includes',
	templateUrl: './includes.component.html',
	styleUrls: ['./includes.component.css']
})
export class IncludesComponent {
	includeTypes: IncludeType[] = [];
	
	constructor() {}

	load(data: ProjectDataResult) {
		for (let i in this.includeTypes) {
			if (data.includes.indexOf(this.includeTypes[i].id)!=-1) {
				const opt_ind = data.includes.indexOf(this.includeTypes[i].id);
				this.includeTypes[i].selected = true;
			}
		}
	}
}