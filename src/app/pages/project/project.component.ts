import { Component, OnInit }             from '@angular/core';
import { Project, ProjectConfiguration } from '../../interfaces/interfaces';

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
    hasDB: false,
	dbHost: '',
	dbName: '',
	dbUser: '',
	dbPass: ''
  } as ProjectConfiguration;

  constructor() {}
  ngOnInit() {}
}