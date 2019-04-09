import { Component, OnInit } from '@angular/core';
import { Project,
         ProjectConfiguration,
         ProjectConfigurationLists,
         KeyValue,
         Model,
         ModelRow
       } from '../../interfaces/interfaces';

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
  
  projectModel = [];

  constructor() {}
  ngOnInit() {}
  
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
      name: '',
      tableName: '',
      rows: []
    } as Model);
  }
  
  addModelRow(ind: number) {
    this.projectModel[ind].rows.push({
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
}