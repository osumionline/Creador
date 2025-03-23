import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { LoginResult, RegisterData } from "@interfaces/interfaces";
import ApiService from "@services/api.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  imports: [
    FormsModule,
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
  ],
})
export default class SettingsComponent implements OnInit {
  private us: UserService = inject(UserService);
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);

  settingsData: RegisterData = {
    name: "",
    pass: "",
    conf: "",
  };
  settingsNameError: WritableSignal<boolean> = signal<boolean>(false);
  settingsPassError: WritableSignal<boolean> = signal<boolean>(false);
  settingsSending: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.settingsData.name = this.us.user.name;
  }

  saveSettings(): void {
    if (
      this.settingsData.name === "" ||
      this.settingsData.pass === "" ||
      this.settingsData.conf === ""
    ) {
      return;
    }

    this.settingsNameError.set(false);
    this.settingsPassError.set(false);
    if (this.settingsData.pass !== this.settingsData.conf) {
      this.settingsPassError.set(true);
      return;
    }

    this.settingsSending.set(true);
    this.as
      .saveSettings(this.settingsData)
      .subscribe((result: LoginResult): void => {
        this.settingsSending.set(false);
        if (result.status === "ok") {
          this.us.logged = true;
          this.us.user = this.cms.getUser(result.user);
          this.us.saveLogin();

          this.router.navigate(["/main"]);
        } else {
          this.settingsNameError.set(true);
        }
      });
  }
}
