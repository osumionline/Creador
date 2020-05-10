import { Component, OnInit, ViewChild, ElementRef }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project,
		 ProjectDataResult,
         ProjectConfiguration,
         ProjectConfigurationLists,
         Model,
         ModelRow,
         IncludeType,
         IncludeVersion
       } from '../../interfaces/interfaces';
import { ApiService }    from '../../services/api.service';
import { DialogService } from '../../services/dialog.service';
import { CommonService } from '../../services/common.service';
import { environment }   from '../../../environments/environment';
import { ConfigurationComponent } from '../../components/configuration/configuration.component';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
	project = {
		id: null,
		name: 'Nuevo proyecto',
		slug: 'nuevo-proyecto',
		description: '',
		updatedAt: '',
		lastCompilationDate: ''
	} as Project;
	
	@ViewChild('configuration', { static: true }) configuration:ConfigurationComponent;

	hasDB: boolean = false;

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

	includeTypes: IncludeType[] = [];

	savingProject: boolean = false;
	deletingProject: boolean = false;
	generatingProject: boolean = false;

	generateStep: number = 0;
	generatedProject: boolean = false;

	constructor(private as: ApiService,
				private dialog: DialogService,
				private cs: CommonService,
				private router: Router,
				private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.as.getIncludes().subscribe(result => {
			this.includeTypes = result.list;
			this.activatedRoute.params.subscribe((params: Params) => {
				const id = params.id;
				if (id) {
					this.as.getProject(id).subscribe(result => {
						this.loadProject(result);
					});
				}
			});
		});
	}

	loadProject(data: ProjectDataResult) {
		this.project.id          = data.project.id;
		this.project.name        = this.cs.urldecode(data.project.name);
		this.project.slug        = data.project.slug;
		this.project.description = this.cs.urldecode(data.project.description);
		this.project.updatedAt   = data.project.updatedAt;
		this.project.lastCompilationDate = data.project.lastCompilationDate;
		
		this.configuration.load(data);
		this.hasDB = this.configuration.getHasDB();

		this.projectModel = data.models;

		for (let i in this.includeTypes) {
			if (data.includes.indexOf(this.includeTypes[i].id)!=-1) {
				const opt_ind = data.includes.indexOf(this.includeTypes[i].id);
				this.includeTypes[i].selected = true;
			}
		}
	}

	addModel() {
		this.projectModel.push({
			id: null,
			name: '',
			tableName: '',
			rows: []
		} as Model);
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
			comment: null
		} as ModelRow);
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

	removeSelectedInclude(ev, inc) {
		ev.preventDefault();
		delete inc.selected;
	}

	saveProject() {
		if (this.project.name=='') {
			this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre del proyecto en blanco!', ok: 'Continuar'}).subscribe(result => {});
			return false;
		}
		
		const projectConfiguration: ProjectConfiguration = this.configuration.getConfiguration();
		const projectConfigurationLists: ProjectConfigurationLists = this.configuration.getConfigurationLists();

		if (projectConfiguration.hasDB && (projectConfiguration.dbHost=='' || projectConfiguration.dbName=='' || projectConfiguration.dbUser=='' || (!this.project.id && projectConfiguration.dbPass=='') || projectConfiguration.dbCharset=='' || projectConfiguration.dbCollate=='')) {
			this.dialog.alert({title: 'Error', content: 'Has marcado que quieres usar una base de datos, ¡pero has dejado alguno de los campos en blanco!', ok: 'Continuar'}).subscribe(result => {});
			return false;
		}

		if (projectConfiguration.modEmailSmtp && (projectConfiguration.smtpHost=='' || projectConfiguration.smtpPort=='' || projectConfiguration.smtpSecure=='' || projectConfiguration.smtpUser=='' || projectConfiguration.smtpPass=='')) {
			this.dialog.alert({title: 'Error', content: 'Has marcado que quieres usar envío de emails mediante SMTP, ¡pero has dejado alguno de los campos en blanco!', ok: 'Continuar'}).subscribe(result => {});
			return false;
		}

		for (let model of this.projectModel) {
			if (model.name=='') {
				this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre de un modelo en blanco!', ok: 'Continuar'}).subscribe(result => {});
				return false;
			}
			if (model.tableName=='') {
				this.dialog.alert({title: 'Error', content: '¡No puedes dejar en blanco el nombre de la tabla en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
				return false;
			}
			if (model.rows.length==0) {
				this.dialog.alert({title: 'Error', content: '¡No has añadido ningún campo en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
				return false;
			}
			for (let modelRow of model.rows) {
				if (modelRow.name=='') {
					this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre del campo en blanco en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
					return false;
				}
				if (!modelRow.type) {
					this.dialog.alert({title: 'Error', content: '¡No has elegido el tipo de campo para el campo "'+modelRow.name+'" en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
					return false;
				}
			}
		}

		this.savingProject = true;
		this.as.saveProject(this.project, projectConfiguration, projectConfigurationLists, this.projectModel, this.includeTypes).subscribe(result => {
			if (result.status=='ok'){
				this.dialog.alert({title: 'Info', content: 'El proyecto "'+this.project.name+'" ha sido correctamente guardado.', ok: 'Continuar'}).subscribe(result => {
					if (this.project.id==null) {
						this.router.navigate(['/main']);
					}
					else {
						this.as.getProject(this.project.id).subscribe(result => {
							this.loadProject(result);
							this.savingProject = false;
						});
					}
				});
			}
			else {
				this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al guardar el proyecto!', ok: 'Continuar'}).subscribe(result => {
					this.savingProject = false;
				});
			}
		});
	}

	deleteProject() {
		this.deletingProject = true;
		this.as.deleteProject(this.project.id).subscribe(result => {
			if (result.status=='ok') {
				this.dialog.alert({title: 'Info', content: 'El proyecto "'+this.project.name+'" ha sido correctamente borrado.', ok: 'Continuar'}).subscribe(result => {
					this.router.navigate(['/main']);
				});
			}
			else {
				this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al borrar el proyecto!', ok: 'Continuar'}).subscribe(result => {
					this.deletingProject = false;
				});
			}
		});
	}

	generateProject() {
		this.generatingProject = true;
		this.as.generateProject(this.project.id, this.generateStep).subscribe(result => {
			this.generateStep++;
			if (this.generateStep<5) {
				this.generateProject();
			}
			else {
				this.generateStep = 0;
				this.project.lastCompilationDate = this.cs.urldecode(result.date);
				this.generatedProject = true;
				this.generatingProject = false;
			}
		});
	}

	downloadProject() {
		window.location.href = environment.apiUrl + 'download-project/' + this.project.id;
	}
}