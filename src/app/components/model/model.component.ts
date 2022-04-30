import { Component } from '@angular/core';
import {
	ModelInterface,
	ProjectDataResult
} from 'src/app/interfaces/interfaces';
import { Model } from 'src/app/model/model.model';
import { ModelRow } from 'src/app/model/model-row.model';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-model',
	templateUrl: './model.component.html',
	styleUrls: ['../../pages/project/project.component.scss']
})
export class ModelComponent {
	modelRowTypes = [
		{id: 1,  name: 'PK'},
		{id: 10, name: 'PK Str'},
		{id: 2,  name: 'Created'},
		{id: 3,  name: 'Updated'},
		{id: 4,  name: 'Númerico'},
		{id: 5,  name: 'Texto'},
		{id: 6,  name: 'Fecha'},
		{id: 7,  name: 'Booleano'},
		{id: 8,  name: 'Texto largo'},
		{id: 9,  name: 'Float'}
	];

	projectModel: Model[] = [];

	constructor(private cms: ClassMapperService) {}

	load(data: ProjectDataResult): void {
		this.projectModel = this.cms.getModels(data.models);
	}

	getModel(): Model[] {
		return this.projectModel;
	}

	addModel(): void {
		this.projectModel.push(new Model());
	}

	addModelRow(ind: number, model: Model): void {
		this.projectModel[ind].rows.push(new ModelRow());
		model.open = true;
	}

	deleteModel(ind: number): void {
		this.projectModel.splice(ind, 1);
	}

	deleteModelRow(ind: number, field: number): void {
		this.projectModel[ind].rows.splice(field, 1);
	}

	openModel(model: Model): void {
		model.open = !model.open;
	}

	moveRow(ind_model: number, ind: number, sent: string): void {
		let new_order: number;
		if (sent=='down') {
			if (ind<(this.projectModel[ind_model].rows.length-1)) {
				new_order= ind +1;
			}
			else {
				return;
			}
		}
		else {
			if (ind>0) {
				new_order = ind -1;
			}
			else {
				return;
			}
		}
		const aux = this.projectModel[ind_model].rows[ind];
		this.projectModel[ind_model].rows[ind] = this.projectModel[ind_model].rows[new_order];
		this.projectModel[ind_model].rows[new_order] = aux;
	}
}
