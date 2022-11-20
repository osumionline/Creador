/*
 * Páginas
 */
import { LoginComponent } from "src/app/pages/login/login.component";
import { RegisterComponent } from "src/app/pages/register/register.component";
import { MainComponent } from "src/app/pages/main/main.component";
import { ProjectComponent } from "src/app/pages/project/project.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";

export const PAGES: any[] = [
  LoginComponent,
  RegisterComponent,
  MainComponent,
  ProjectComponent,
  SettingsComponent,
];

/*
 * Componentes
 */
import { ConfirmDialogComponent } from "src/app/components/dialogs/confirm-dialog/confirm-dialog.component";
import { AlertDialogComponent } from "src/app/components/dialogs/alert-dialog/alert-dialog.component";
import { FormDialogComponent } from "src/app/components/dialogs/form-dialog/form-dialog.component";
import { ConfigurationComponent } from "src/app/components/configuration/configuration.component";
import { ModelComponent } from "src/app/components/model/model.component";
import { IncludesComponent } from "src/app/components/includes/includes.component";
import { PluginsComponent } from "src/app/components/plugins/plugins.component";

export const COMPONENTS: any[] = [
  ConfirmDialogComponent,
  AlertDialogComponent,
  FormDialogComponent,
  ConfigurationComponent,
  ModelComponent,
  IncludesComponent,
  PluginsComponent,
];

/*
 * Pipes
 */
export const PIPES: any[] = [];

/*
 * Servicios
 */
import { ApiService } from "src/app/services/api.service";
import { DataShareService } from "src/app/services/data-share.service";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { DialogService } from "src/app/services/dialog.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";

export const SERVICES: any[] = [
  ApiService,
  DataShareService,
  UserService,
  AuthService,
  DialogService,
  ClassMapperService,
];

/*
 * Componentes Angular Material
 */
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";

export const MATERIAL: any[] = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatDialogModule,
  MatSelectModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
];
