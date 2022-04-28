import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiService }        from 'src/app/services/api.service';
import { DataShareService }  from 'src/app/services/data-share.service';
import { Project }           from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: []
})
export class MainComponent implements OnInit {
	projects: Project[]  = [];
	loading: boolean   = true;
	loadError: boolean = false;

	constructor(
		private as: ApiService,
		private dss: DataShareService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.as.getProjects().subscribe(result => {
			if (result.status=='ok') {
				this.projects = result.list;
				this.loading = false;
			}
		},
		error => {
			this.loading   = false;
			this.loadError = true;
		});
	}
}