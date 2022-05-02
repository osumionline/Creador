import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { ApiService }         from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { UserService }        from 'src/app/services/user.service';
import { Project }            from 'src/app/model/project.model';

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
		private cms: ClassMapperService,
		private us: UserService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.as.getProjects().subscribe(result => {
			if (result.status=='ok') {
				this.projects = this.cms.getProjects(result.list);
				this.loading = false;
			}
		},
		error => {
			this.loading   = false;
			this.loadError = true;
		});
	}

	logout(): void {
		this.us.logout();
		this.router.navigate(['/']);
	}
}