import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatListItem,
  MatListItemTitle,
  MatNavList,
} from "@angular/material/list";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { ProjectResult } from "@interfaces/interfaces";
import Project from "@model/project.model";
import ApiService from "@services/api.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  imports: [
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatButton,
    MatFabButton,
    MatIcon,
    MatNavList,
    MatListItem,
    MatListItemTitle,
  ],
})
export default class MainComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private us: UserService = inject(UserService);
  private router: Router = inject(Router);

  projects: WritableSignal<Project[]> = signal<Project[]>([]);
  loading: WritableSignal<boolean> = signal<boolean>(true);
  loadError: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.as.getProjects().subscribe({
      next: (result: ProjectResult): void => {
        if (result.status == "ok") {
          this.projects.set(this.cms.getProjects(result.list));
          this.loading.set(false);
        }
      },
      error: (error): void => {
        console.error(error);
        this.loading.set(false);
        this.loadError.set(true);
      },
    });
  }

  logout(): void {
    this.us.logout();
    this.router.navigate(["/"]);
  }
}
