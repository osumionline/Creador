import { Component, OnInit } from '@angular/core';
import { Project,
         ProjectConfiguration,
         ProjectConfigurationLists
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
  row = {
    general: true,
    db: false,
    cookies: false,
    baseModules: false,
	errors: false,
	css: false,
	js: false,
	libs: false,
	extra: false
  };

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
}