import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiService }        from '../../services/api.service';
import { DataShareService }  from '../../services/data-share.service';
import { UserService }       from '../../services/user.service';
import { Project }           from '../../interfaces/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  projects: Project[]  = [];
	loading: boolean   = true;
	loadError: boolean = false;

  constructor(private as: ApiService,
              private dss: DataShareService,
              private user: UserService,
              private router: Router) { }
  ngOnInit() {
    this.as.getProjects().subscribe(result => {
      if (result.status=='ok'){
        this.projects = result.list;
		this.loading = false;
      }
      else{
        
      }
    },
	error => {
		this.loading    = false;
		this.loadError  = true;
	});
  }
}