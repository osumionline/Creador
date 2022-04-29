import { Component } from '@angular/core';
import {
	ModelInterface,
	ModelRowInterface,
	ProjectDataResult
} from 'src/app/interfaces/interfaces';

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

	projectModel: ModelInterface[] = [];

	constructor() {}
	
	load(data: ProjectDataResult) {
		this.projectModel = data.models;
	}
	
	getModel() {
		return this.projectModel;
	}

	addModel() {
		this.projectModel.push({
			id: null,
			name: '',
			tableName: '',
			rows: []
		});
	}

	addModelRow(ind: number, model) {
		this.projectModel[ind].rows.push({
			id: null,
			name: null,
			type: null,
			size: null,
			autoIncrement: false,
			nullable: true,
			defaultValue: null,
			ref: null,
			comment: null,
			order: null
		});
		model.open = true;
	}

	deleteModel(ind: number) {
		this.projectModel.splice(ind, 1);
	}

	deleteModelRow(ind: number, field: number) {
		this.projectModel[ind].rows.splice(field, 1);
	}

	openModel(model) {
		model.open = !model.open;
	}

	moveRow(ind_model, ind, sent) {
		let new_order;
		if (sent=='down') {
			if (ind<(this.projectModel[ind_model].rows.length-1)) {
				new_order= ind +1;
			}
			else {
				return false;
			}
		}
		else {
			if (ind>0) {
				new_order = ind -1;
			}
			else {
				return false;
			}
		}
		const aux = this.projectModel[ind_model].rows[ind];
		this.projectModel[ind_model].rows[ind] = this.projectModel[ind_model].rows[new_order];
		this.projectModel[ind_model].rows[new_order] = aux;
	}
}