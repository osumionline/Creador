import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import {
  IncludeResult,
  IncludeTypeInterface,
  ModelInterface,
  ProjectDataResult,
  ProjectDownloadResult,
  StatusResult,
} from "src/app/interfaces/interfaces";
import { IncludeType } from "src/app/model/include-type.model";
import { Model } from "src/app/model/model.model";
import { ProjectConfigurationLists } from "src/app/model/project-configuration-lists.model";
import { ProjectConfiguration } from "src/app/model/project-configuration.model";
import { Project } from "src/app/model/project.model";
import { Utils } from "src/app/model/utils.class";
import { ConfigurationComponent } from "src/app/modules/shared/components/configuration/configuration.component";
import { IncludesComponent } from "src/app/modules/shared/components/includes/includes.component";
import { ModelComponent } from "src/app/modules/shared/components/model/model.component";
import { ApiService } from "src/app/services/api.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Component({
  standalone: true,
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IncludesComponent,
    ModelComponent,
    ConfigurationComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DialogService],
})
export default class ProjectComponent implements OnInit {
  loading: boolean = true;
  project: Project = new Project();

  @ViewChild("configuration", { static: true })
  configuration: ConfigurationComponent;
  @ViewChild("model", { static: true }) model: ModelComponent;
  @ViewChild("includes", { static: true }) includes: IncludesComponent;

  savingProject: boolean = false;
  deletingProject: boolean = false;
  generatingProject: boolean = false;

  generateStep: number = 0;
  generatedProject: boolean = false;

  constructor(
    private as: ApiService,
    private dialog: DialogService,
    private us: UserService,
    private cms: ClassMapperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.as.getIncludes().subscribe((result: IncludeResult): void => {
      this.includes.setIncludeTypes(this.cms.getIncludeTypes(result.list));
      this.activatedRoute.params.subscribe((params: Params): void => {
        const id: number = params.id;
        if (id) {
          this.as
            .getProject(id)
            .subscribe((result: ProjectDataResult): void => {
              this.loadProject(result);
            });
        } else {
          this.loading = false;
        }
      });
    });
  }

  loadProject(data: ProjectDataResult): void {
    this.project = this.cms.getProject(data.project);

    this.configuration.load(data);
    this.model.load(data);
    this.includes.load(data);
    this.loading = false;
  }

  saveProject(): void {
    if (this.project.name == "") {
      this.dialog.alert({
        title: "Error",
        content: "¡No puedes dejar el nombre del proyecto en blanco!",
        ok: "Continuar",
      });
      return;
    }

    const projectConfiguration: ProjectConfiguration =
      this.configuration.getConfiguration();
    const projectConfigurationLists: ProjectConfigurationLists =
      this.configuration.getConfigurationLists();
    const projectModel: Model[] = this.model.getModel();
    const includeTypes: IncludeType[] = this.includes.getIncludeTypes();

    if (
      projectConfiguration.hasDB &&
      (projectConfiguration.dbHost == "" ||
        projectConfiguration.dbName == "" ||
        projectConfiguration.dbUser == "" ||
        (!this.project.id && projectConfiguration.dbPass == "") ||
        projectConfiguration.dbCharset == "" ||
        projectConfiguration.dbCollate == "")
    ) {
      this.dialog.alert({
        title: "Error",
        content:
          "Has marcado que quieres usar una base de datos, ¡pero has dejado alguno de los campos en blanco!",
        ok: "Continuar",
      });
      return;
    }

    for (const model of projectModel) {
      if (model.name == "") {
        this.dialog.alert({
          title: "Error",
          content: "¡No puedes dejar el nombre de un modelo en blanco!",
          ok: "Continuar",
        });
        return;
      }
      if (model.tableName == "") {
        this.dialog.alert({
          title: "Error",
          content:
            '¡No puedes dejar en blanco el nombre de la tabla en el modelo "' +
            model.name +
            '"!',
          ok: "Continuar",
        });
        return;
      }
      if (model.rows.length == 0) {
        this.dialog.alert({
          title: "Error",
          content:
            '¡No has añadido ningún campo en el modelo "' + model.name + '"!',
          ok: "Continuar",
        });
        return;
      }
      for (const modelRow of model.rows) {
        if (modelRow.name == "") {
          this.dialog.alert({
            title: "Error",
            content:
              '¡No puedes dejar el nombre del campo en blanco en el modelo "' +
              model.name +
              '"!',
            ok: "Continuar",
          });
          return;
        }
        if (!modelRow.type) {
          this.dialog.alert({
            title: "Error",
            content:
              '¡No has elegido el tipo de campo para el campo "' +
              modelRow.name +
              '" en el modelo "' +
              model.name +
              '"!',
            ok: "Continuar",
          });
          return;
        }
      }
    }

    this.savingProject = true;
    this.as
      .saveProject(
        this.project.toInterface(),
        projectConfiguration.toInterface(),
        projectConfigurationLists.toInterface(),
        projectModel.map((item: Model): ModelInterface => {
          return item.toInterface();
        }),
        includeTypes.map((item: IncludeType): IncludeTypeInterface => {
          return item.toInterface();
        })
      )
      .subscribe((result: StatusResult): void => {
        if (result.status == "ok") {
          this.dialog
            .alert({
              title: "Info",
              content:
                'El proyecto "' +
                this.project.name +
                '" ha sido correctamente guardado.',
              ok: "Continuar",
            })
            .subscribe((): void => {
              if (this.project.id == null) {
                this.router.navigate(["/main"]);
              } else {
                this.as
                  .getProject(this.project.id)
                  .subscribe((result: ProjectDataResult): void => {
                    this.loadProject(result);
                    this.savingProject = false;
                  });
              }
            });
        } else {
          this.dialog
            .alert({
              title: "Error",
              content: "¡Ocurrió un error al guardar el proyecto!",
              ok: "Continuar",
            })
            .subscribe((): void => {
              this.savingProject = false;
            });
        }
      });
  }

  deleteProject(): void {
    this.deletingProject = true;
    this.as
      .deleteProject(this.project.id)
      .subscribe((result: StatusResult): void => {
        if (result.status == "ok") {
          this.dialog
            .alert({
              title: "Info",
              content:
                'El proyecto "' +
                this.project.name +
                '" ha sido correctamente borrado.',
              ok: "Continuar",
            })
            .subscribe((): void => {
              this.router.navigate(["/main"]);
            });
        } else {
          this.dialog
            .alert({
              title: "Error",
              content: "¡Ocurrió un error al borrar el proyecto!",
              ok: "Continuar",
            })
            .subscribe((): void => {
              this.deletingProject = false;
            });
        }
      });
  }

  generateProject(): void {
    this.generatingProject = true;
    this.as
      .generateProject(this.project.id, this.generateStep)
      .subscribe((result: ProjectDownloadResult): void => {
        this.generateStep++;
        if (this.generateStep < 5) {
          this.generateProject();
        } else {
          this.generateStep = 0;
          this.project.lastCompilationDate = Utils.urldecode(result.date);
          this.generatedProject = true;
          this.generatingProject = false;
        }
      });
  }

  downloadProject(): void {
    window.location.href =
      environment.apiUrl +
      "download-project/" +
      this.project.id +
      "?tk=" +
      btoa(this.us.user.token);
  }
}
