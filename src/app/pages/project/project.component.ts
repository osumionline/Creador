import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project,
         ProjectConfiguration,
         ProjectConfigurationLists,
         KeyValue,
         Model,
         ModelRow,
         IncludeType,
         IncludeVersion
       } from '../../interfaces/interfaces';
import { ApiService }    from '../../services/api.service';
import { DialogService } from '../../services/dialog.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-project',
  templateUrl: './html/project.component.html',
  styleUrls: ['./css/project.component.css']
})
export class ProjectComponent implements OnInit {
  project = {
    id: null,
    name: 'Nuevo proyecto',
    slug: 'nuevo-proyecto',
    description: ''
  } as Project;

  projectConfiguration = {
    baseUrl: '',
    adminEmail: '',
    defaultTitle: '',
    lang: 'es',
    hasDB: false,
    dbHost: '',
    dbName: '',
    dbUser: '',
    dbPass: '',
    cookiesPrefix: '',
    cookiesUrl: '',
    modBrowser: false,
    modEmail: false,
    modEmailSmtp: false,
    modFtp: false,
    modImage: false,
    modPdf: false,
    modTranslate: false,
    modCrypt: false,
    smtpHost: '',
    smtpPort: '',
    smtpSecure: '',
    smtpUser: '',
    smtpPass: '',
    error403: '',
    error404: '',
    error500: ''
  } as ProjectConfiguration;

  projectConfigurationLists = {
    css: [],
    cssExt: [],
    js: [],
    jsExt: [],
    libs: [],
    extra: [],
    dir: []
  } as ProjectConfigurationLists;

  newItem = {
    css: '',
    cssExt: '',
    js: '',
    jsExt: '',
    libs: '',
    extraKey: '',
    extraValue: '',
    dirKey: '',
    dirValue: ''
  };

  row = {
    general: true,
    db: false,
    cookies: false,
    baseModules: false,
    errors: false,
    css: false,
    js: false,
    libs: false,
    extra: false,
    dir: false
  };
  
  modelRowTypes = [
    {id: 1, name: 'PK'},
    {id: 2, name: 'PK Str'},
    {id: 3, name: 'Created'},
    {id: 4, name: 'Updated'},
    {id: 5, name: 'Númerico'},
    {id: 6, name: 'Texto'},
    {id: 7, name: 'Fecha'},
    {id: 8, name: 'Booleano'},
    {id: 9, name: 'Texto largo'},
    {id: 10, name: 'Float'}
  ];
  
  projectModel: Model[] = [];
  
  includeTypes: IncludeType[] = [];
  
  savingProject = false;

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
        if (id){
          console.log(id);
          this.as.getProject(id).subscribe(result => {
            this.loadProject(result);
          });
        }
      });
    });
  }
  
  loadProject(data) {
    console.log(data);
    this.project.id          = data.project.id;
    this.project.name        = this.cs.urldecode(data.project.name);
    this.project.slug        = data.project.slug;
    this.project.description = this.cs.urldecode(data.project.description);
	
    this.projectConfiguration.baseUrl       = this.cs.urldecode(data.configuration.baseUrl);
    this.projectConfiguration.adminEmail    = this.cs.urldecode(data.configuration.adminEmail);
    this.projectConfiguration.defaultTitle  = this.cs.urldecode(data.configuration.defaultTitle);
    this.projectConfiguration.lang          = this.cs.urldecode(data.configuration.lang);
    this.projectConfiguration.hasDB         = data.configuration.hasDB;
    this.projectConfiguration.dbHost        = this.cs.urldecode(data.configuration.dbHost);
    this.projectConfiguration.dbName        = this.cs.urldecode(data.configuration.dbName);
    this.projectConfiguration.dbUser        = this.cs.urldecode(data.configuration.dbUser);
    this.projectConfiguration.dbPass        = null;
    this.projectConfiguration.cookiesPrefix = this.cs.urldecode(data.configuration.cookiesPrefix);
    this.projectConfiguration.cookiesUrl    = this.cs.urldecode(data.configuration.cookiesUrl);
    this.projectConfiguration.modBrowser    = data.configuration.modBrowser;
    this.projectConfiguration.modEmail      = data.configuration.modEmail;
    this.projectConfiguration.modEmailSmtp  = data.configuration.modEmailSmtp;
    this.projectConfiguration.modFtp        = data.configuration.modFtp;
    this.projectConfiguration.modImage      = data.configuration.modImage;
    this.projectConfiguration.modPdf        = data.configuration.modPdf;
    this.projectConfiguration.modTranslate  = data.configuration.modTranslate;
    this.projectConfiguration.modCrypt      = data.configuration.modCrypt;
    this.projectConfiguration.smtpHost      = this.cs.urldecode(data.configuration.smtpHost);
    this.projectConfiguration.smtpPort      = this.cs.urldecode(data.configuration.smtpPort);
    this.projectConfiguration.smtpSecure    = this.cs.urldecode(data.configuration.smtpSecure);
    this.projectConfiguration.smtpUser      = this.cs.urldecode(data.configuration.smtpUser);
    this.projectConfiguration.smtpPass      = null;
    this.projectConfiguration.error403      = this.cs.urldecode(data.configuration.error403);
    this.projectConfiguration.error404      = this.cs.urldecode(data.configuration.error404);
    this.projectConfiguration.error500      = this.cs.urldecode(data.configuration.error500);
    
    this.projectConfigurationLists.css    = data.lists.css.map(this.cs.urldecode);
    this.projectConfigurationLists.cssExt = data.lists.cssExt.map(this.cs.urldecode);
    this.projectConfigurationLists.js     = data.lists.js.map(this.cs.urldecode);
    this.projectConfigurationLists.jsExt  = data.lists.jsExt.map(this.cs.urldecode);
    this.projectConfigurationLists.libs   = data.lists.libs.map(this.cs.urldecode);
    this.projectConfigurationLists.extra  = data.lists.extra.map((item) => { return this.urldecodeKeyValue(item); });
    this.projectConfigurationLists.dir    = data.lists.dir.map((item) => { return this.urldecodeKeyValue(item); });
    
    this.projectModel = data.models;
    
    for (let i in this.includeTypes){
      if (data.includes.indexOf(this.includeTypes[i].id)!=-1){
        this.includeTypes[i].selected = true;
      }
    }
  }
  
  urldecodeKeyValue(item){
    return {key: this.cs.urldecode(item.key), value: this.cs.urldecode(item.value)};
  }
  
  deploy(ind) {
    this.row[ind] = !this.row[ind];
  }
  
  changeHasDB() {
    this.projectConfiguration.hasDB = !this.projectConfiguration.hasDB;
  }
  
  changeModule(ind) {
    this.projectConfiguration[ind] = !this.projectConfiguration[ind];
    if (!this.projectConfiguration.modEmail){
      this.projectConfiguration.modEmailSmtp = false;
    }
  }
  
  addNew(type) {
    switch(type) {
      case 'css':
      case 'cssExt':
      case 'js':
      case 'jsExt':
      case 'libs':
        this.projectConfigurationLists[type].push( this.newItem[type] );
        this.newItem[type] = '';
        break;
      case 'extra':
        this.projectConfigurationLists.extra.push( {key: this.newItem.extraKey, value: this.newItem.extraValue } as KeyValue );
        this.newItem.extraKey = '';
        this.newItem.extraValue = '';
        break;
      case 'dir':
        this.projectConfigurationLists.dir.push( {key: this.newItem.dirKey, value: this.newItem.dirValue } as KeyValue );
        this.newItem.dirKey = '';
        this.newItem.dirValue = '';
        break;
    }
  }

  deleteNew(type, ind) {
    this.projectConfigurationLists[type].splice(ind, 1);
  }
  
  addModel() {
    this.projectModel.push({
      id: null,
      name: '',
      tableName: '',
      rows: []
    } as Model);
  }
  
  addModelRow(ind: number) {
    this.projectModel[ind].rows.push({
      id: null,
      name: '',
      type: null,
      size: null,
      autoIncrement: false,
      nullable: true,
      defaultValue: '',
      ref: '',
      comment: ''
	} as ModelRow);
  }
  
  deleteModel(ind: number) {
    this.projectModel.splice(ind, 1);
  }
  
  deleteModelRow(ind: number, field: number) {
    this.projectModel[ind].rows.splice(field, 1);
  }
  
  saveProject() {
    if (this.project.name==''){
      this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre del proyecto en blanco!', ok: 'Continuar'}).subscribe(result => {});
	  return false;
	}
	
	if (this.projectConfiguration.hasDB && (this.projectConfiguration.dbHost=='' || this.projectConfiguration.dbName=='' || this.projectConfiguration.dbUser=='' || this.projectConfiguration.dbPass=='')){
      this.dialog.alert({title: 'Error', content: 'Has marcado que quieres usar una base de datos, ¡pero has dejado alguno de los campos en blanco!', ok: 'Continuar'}).subscribe(result => {});
	  return false;
    }
	
	if (this.projectConfiguration.modEmailSmtp && (this.projectConfiguration.smtpHost=='' || this.projectConfiguration.smtpPort=='' || this.projectConfiguration.smtpSecure=='' || this.projectConfiguration.smtpUser=='' || this.projectConfiguration.smtpPass=='')){
      this.dialog.alert({title: 'Error', content: 'Has marcado que quieres usar envío de emails mediante SMTP, ¡pero has dejado alguno de los campos en blanco!', ok: 'Continuar'}).subscribe(result => {});
      return false;
    }
	
    for (let model of this.projectModel){
      if (model.name==''){
        this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre de un modelo en blanco!', ok: 'Continuar'}).subscribe(result => {});
        return false;
      }
      if (model.tableName==''){
        this.dialog.alert({title: 'Error', content: '¡No puedes dejar en blanco el nombre de la tabla en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
        return false;
      }
      if (model.rows.length==0){
        this.dialog.alert({title: 'Error', content: '¡No has añadido ningún campo en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
        return false;
      }
	  for (let modelRow of model.rows){
        if (modelRow.name==''){
          this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre del campo en blanco en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
          return false;
        }
        if (!modelRow.type){
          this.dialog.alert({title: 'Error', content: '¡No has elegido el tipo de campo para el campo "'+modelRow.name+'" en el modelo "'+model.name+'"!', ok: 'Continuar'}).subscribe(result => {});
          return false;
        }
	  }
    }
	
	this.savingProject = true;
	this.as.saveProject(this.project, this.projectConfiguration, this.projectConfigurationLists, this.projectModel, this.includeTypes).subscribe(result => {
      if (result.status=='ok'){
        this.dialog.alert({title: 'Info', content: 'El proyecto "'+this.project.name+'" ha sido correctamente guardado.', ok: 'Continuar'}).subscribe(result => {
          this.router.navigate(['/main']);
		});
      }
      else{
        this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al guardar el proyecto!', ok: 'Continuar'}).subscribe(result => {
          this.savingProject = false;
        });
      }
	});
  }
}