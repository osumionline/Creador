import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {
  Component,
  inject,
  input,
  InputSignalWithTransform,
  numberAttribute,
  OnInit,
  signal,
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
import { Router, RouterLink } from "@angular/router";
import { environment } from "@env/environment";
import {
  IncludeResult,
  IncludeTypeInterface,
  ModelInterface,
  PluginInterface,
  PluginsRep,
  ProjectDataResult,
  ProjectDownloadResult,
  StatusResult,
} from "@interfaces/interfaces";
import IncludeType from "@model/include-type.model";
import Model from "@model/model.model";
import Plugin from "@model/plugin.model";
import ProjectConfigurationLists from "@model/project-configuration-lists.model";
import ProjectConfiguration from "@model/project-configuration.model";
import ProjectPlugin from "@model/project-plugin.model";
import Project from "@model/project.model";
import { DialogService } from "@osumi/angular-tools";
import { urldecode } from "@osumi/tools";
import ApiService from "@services/api.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";
import ConfigurationComponent from "@shared/components/configuration/configuration.component";
import IncludesComponent from "@shared/components/includes/includes.component";
import ModelComponent from "@shared/components/model/model.component";
import PluginsComponent from "@shared/components/plugins/plugins.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  imports: [
    ConfigurationComponent,
    ModelComponent,
    IncludesComponent,
    PluginsComponent,
    FormsModule,
    RouterLink,
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

  id: InputSignalWithTransform<number, unknown> = input.required({
    transform: numberAttribute,
  });
  loading: WritableSignal<boolean> = signal<boolean>(true);
  project: WritableSignal<Project> = signal<Project>(new Project());
  projectConfiguration: WritableSignal<ProjectConfiguration> =
    signal<ProjectConfiguration>(new ProjectConfiguration());
  projectConfigurationLists: WritableSignal<ProjectConfigurationLists> =
    signal<ProjectConfigurationLists>(new ProjectConfigurationLists());
  projectModel: WritableSignal<Model[]> = signal<Model[]>([]);
  projectPlugins: WritableSignal<ProjectPlugin[]> = signal<ProjectPlugin[]>([]);
  includeTypes: WritableSignal<IncludeType[]> = signal<IncludeType[]>([]);
  plugins: WritableSignal<Plugin[]> = signal<Plugin[]>([]);

  savingProject: WritableSignal<boolean> = signal<boolean>(false);
  deletingProject: WritableSignal<boolean> = signal<boolean>(false);
  generatingProject: WritableSignal<boolean> = signal<boolean>(false);

  generateStep: number = 0;
  generatedProject: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.loadIncludes();
  }

  loadIncludes(): void {
    this.as.getIncludes().subscribe((result: IncludeResult): void => {
      this.includeTypes.set(this.cms.getIncludeTypes(result.list));
      this.loadPlugins();
    });
  }

  loadPlugins(): void {
    this.as.getPluginList().subscribe((result: PluginsRep): void => {
      this.plugins.set(this.cms.getPlugins(result.plugins));
      this.loadProject();
    });
  }

  loadProject(): void {
    // En proyectos nuevos no cargamos nada
    if (Number.isNaN(this.id())) {
      this.loading.set(false);
      this.savingProject.set(false);
      return;
    }
    // Cargamos el proyecto
    this.as
      .getProject(this.id())
      .subscribe((result: ProjectDataResult): void => {
        this.project.set(this.cms.getProject(result.project));

        // Configuración
        this.projectConfiguration.set(
          new ProjectConfiguration().fromInterface(result.configuration)
        );
        this.projectConfigurationLists.set(
          new ProjectConfigurationLists().fromInterface(result.lists)
        );
        // Modelo
        this.projectModel.set(this.cms.getModels(result.models));
        // Includes
        for (const i in this.includeTypes()) {
          if (result.includes.indexOf(this.includeTypes()[i].id) !== -1) {
            const opt_ind: number = result.includes.indexOf(
              this.includeTypes()[i].id
            );
            if (opt_ind !== -1) {
              this.includeTypes.update(
                (value: IncludeType[]): IncludeType[] => {
                  value[i].selected = true;
                  return value;
                }
              );
            }
          }
        }
        // Plugins
        this.projectPlugins.set(this.cms.getProjectPlugins(result.plugins));
        for (const i in this.plugins()) {
          for (const j in this.projectPlugins()) {
            if (this.plugins()[i].name == this.projectPlugins()[j].name) {
              this.plugins.update((value: Plugin[]): Plugin[] => {
                value[i].selected = true;
                return value;
              });
            }
          }
        }

        this.loading.set(false);
        this.savingProject.set(false);
      });
  }

  saveProject(): void {
    if (this.project().name == "") {
      this.dialog.alert({
        title: "Error",
        content: "¡No puedes dejar el nombre del proyecto en blanco!",
        ok: "Continuar",
      });
      return;
    }

    if (
      this.projectConfiguration().hasDB &&
      (this.projectConfiguration().dbHost == "" ||
        this.projectConfiguration().dbName == "" ||
        this.projectConfiguration().dbUser == "" ||
        (!this.project().id && this.projectConfiguration().dbPass == "") ||
        this.projectConfiguration().dbCharset == "" ||
        this.projectConfiguration().dbCollate == "")
    ) {
      this.dialog.alert({
        title: "Error",
        content:
          "Has marcado que quieres usar una base de datos, ¡pero has dejado alguno de los campos en blanco!",
        ok: "Continuar",
      });
      return;
    }

    for (const model of this.projectModel()) {
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
        this.project().toInterface(),
        this.projectConfiguration().toInterface(),
        this.projectConfigurationLists().toInterface(),
        this.projectModel().map((item: Model): ModelInterface => {
          return item.toInterface();
        }),
        this.includeTypes().map((item: IncludeType): IncludeTypeInterface => {
          return item.toInterface();
        }),
        this.plugins()
          .filter((item: Plugin): boolean => item.selected)
          .map((item: Plugin): PluginInterface => {
            return item.toInterface();
          })
      )
      .subscribe({
        next: (result: StatusResult): void => {
          if (result.status == "ok") {
            this.dialog
              .alert({
                title: "Info",
                content:
                  'El proyecto "' +
                  this.project().name +
                  '" ha sido correctamente guardado.',
                ok: "Continuar",
              })
              .subscribe((): void => {
                if (this.project().id == null) {
                  this.router.navigate(["/main"]);
                } else {
                  this.loadPlugins();
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
        },
        error: (err): void => {
          console.error(err);
          this.dialog
            .alert({
              title: "Error",
              content: "¡Ocurrió un error al guardar el proyecto!",
              ok: "Continuar",
            })
            .subscribe((): void => {
              this.savingProject.set(false);
            });
        },
      });
  }

  deleteProject(): void {
    this.deletingProject.set(true);
    this.as
      .deleteProject(this.project().id)
      .subscribe((result: StatusResult): void => {
        if (result.status == "ok") {
          this.dialog
            .alert({
              title: "Info",
              content: `El proyecto "${
                this.project().name
              }" ha sido correctamente borrado.`,
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
      .generateProject(this.project().id, this.generateStep)
      .subscribe((result: ProjectDownloadResult): void => {
        this.generateStep++;
        if (this.generateStep < 6) {
          this.generateProject();
        } else {
          this.generateStep = 0;
          this.project.update((value: Project): Project => {
            value.lastCompilationDate = urldecode(result.date);
            return value;
          });
          this.generatedProject.set(true);
          this.generatingProject.set(false);
        }
      });
  }

  downloadProject(): void {
    window.location.href = `${environment.apiUrl}download-project/${
      this.project().id
    }?tk=${btoa(this.us.user.token)}`;
  }
}
