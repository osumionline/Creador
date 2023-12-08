import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { ProjectResult } from "src/app/interfaces/interfaces";
import { Project } from "src/app/model/project.model";
import { ApiService } from "src/app/services/api.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { UserService } from "src/app/services/user.service";

@Component({
  standalone: true,
  selector: "app-main",
  templateUrl: "./main.component.html",
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
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
      (error): void => {
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
