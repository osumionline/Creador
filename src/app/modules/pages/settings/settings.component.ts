import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { LoginResult, RegisterData } from "src/app/interfaces/interfaces";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ApiService } from "src/app/services/api.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { UserService } from "src/app/services/user.service";

@Component({
  standalone: true,
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
})
export default class SettingsComponent implements OnInit {
  settingsData: RegisterData = {
    name: "",
    pass: "",
    conf: "",
  };
  settingsNameError: boolean = false;
  settingsPassError: boolean = false;
  settingsSending: boolean = false;

  constructor(
    private us: UserService,
    private as: ApiService,
    private cms: ClassMapperService,
    private router: Router
  ) {}
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

    this.settingsNameError = false;
    this.settingsPassError = false;
    if (this.settingsData.pass !== this.settingsData.conf) {
      this.settingsPassError = true;
      return;
    }

    this.settingsSending = true;
    this.as
      .saveSettings(this.settingsData)
      .subscribe((result: LoginResult): void => {
        this.settingsSending = false;
        if (result.status === "ok") {
          this.us.logged = true;
          this.us.user = this.cms.getUser(result.user);
          this.us.saveLogin();

          this.router.navigate(["/main"]);
        } else {
          this.settingsNameError = true;
        }
      });
  }
}
