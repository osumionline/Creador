import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  viewChild,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule,
} from "@angular/material/tabs";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { environment } from "@env/environment";
import {
  IncludeResult,
  IncludeTypeInterface,
  ModelInterface,
  ProjectDataResult,
  ProjectDownloadResult,
  StatusResult,
} from "@interfaces/interfaces";
import IncludeType from "@model/include-type.model";
import Model from "@model/model.model";
import ProjectConfigurationLists from "@model/project-configuration-lists.model";
import ProjectConfiguration from "@model/project-configuration.model";
import Project from "@model/project.model";
import { DialogService } from "@osumi/angular-tools";
import { urldecode } from "@osumi/tools";
import ApiService from "@services/api.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";
import ConfigurationComponent from "@shared/components/configuration/configuration.component";
import IncludesComponent from "@shared/components/includes/includes.component";
import ModelComponent from "@shared/components/model/model.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  imports: [
    FormsModule,
    RouterLink,
    IncludesComponent,
    ModelComponent,
    ConfigurationComponent,
    MatToolbar,
    MatToolbarRow,
    MatButton,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatTabsModule,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
  ],
})
export default class ProjectComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private dialog: DialogService = inject(DialogService);
  private us: UserService = inject(UserService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  loading: WritableSignal<boolean> = signal<boolean>(true);
  project: Project = new Project();

  configuration: Signal<ConfigurationComponent> =
    viewChild.required<ConfigurationComponent>("configuration");
  model: Signal<ModelComponent> = viewChild.required<ModelComponent>("model");
  includes: Signal<IncludesComponent> =
    viewChild.required<IncludesComponent>("includes");

  savingProject: WritableSignal<boolean> = signal<boolean>(false);
  deletingProject: WritableSignal<boolean> = signal<boolean>(false);
  generatingProject: WritableSignal<boolean> = signal<boolean>(false);

  generateStep: number = 0;
  generatedProject: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.as.getIncludes().subscribe((result: IncludeResult): void => {
      this.includes().setIncludeTypes(this.cms.getIncludeTypes(result.list));
      this.activatedRoute.params.subscribe((params: Params): void => {
        const id: number = params["id"];
        if (id) {
          this.as
            .getProject(id)
            .subscribe((result: ProjectDataResult): void => {
              this.loadProject(result);
            });
        } else {
          this.loading.set(false);
        }
      });
    });
  }

  loadProject(data: ProjectDataResult): void {
    this.project = this.cms.getProject(data.project);

    this.configuration().load(data);
    this.model().load(data);
    this.includes().load(data);
    this.loading.set(false);
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
      this.configuration().getConfiguration();
    const projectConfigurationLists: ProjectConfigurationLists =
      this.configuration().getConfigurationLists();
    const projectModel: Model[] = this.model().getModel();
    const includeTypes: IncludeType[] = this.includes().getIncludeTypes();

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

    this.savingProject.set(true);
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
                    this.savingProject.set(false);
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
              this.savingProject.set(false);
            });
        }
      });
  }

  deleteProject(): void {
    this.deletingProject.set(true);
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
              this.deletingProject.set(false);
            });
        }
      });
  }

  generateProject(): void {
    this.generatingProject.set(true);
    this.as
      .generateProject(this.project.id, this.generateStep)
      .subscribe((result: ProjectDownloadResult): void => {
        this.generateStep++;
        if (this.generateStep < 5) {
          this.generateProject();
        } else {
          this.generateStep = 0;
          this.project.lastCompilationDate = urldecode(result.date);
          this.generatedProject.set(true);
          this.generatingProject.set(false);
        }
      });
  }

  downloadProject(): void {
    window.location.href = `${environment.apiUrl}download-project/${
      this.project.id
    }?tk=${btoa(this.us.user.token)}`;
  }
}
