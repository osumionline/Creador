import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ProjectResult } from "src/app/interfaces/interfaces";
import { Project } from "src/app/model/project.model";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ApiService } from "src/app/services/api.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { UserService } from "src/app/services/user.service";

@Component({
  standalone: true,
  selector: "app-main",
  templateUrl: "./main.component.html",
  imports: [CommonModule, MaterialModule, RouterModule],
})
export default class MainComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = true;
  loadError: boolean = false;

  constructor(
    private as: ApiService,
    private cms: ClassMapperService,
    private us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.as.getProjects().subscribe(
      (result: ProjectResult): void => {
        if (result.status == "ok") {
          this.projects = this.cms.getProjects(result.list);
          this.loading = false;
        }
      },
      (error: any): void => {
        this.loading = false;
        this.loadError = true;
      }
    );
  }

  logout(): void {
    this.us.logout();
    this.router.navigate(["/"]);
  }
}
