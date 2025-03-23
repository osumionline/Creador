import { Component, inject, signal, WritableSignal } from "@angular/core";
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
  selector: "app-register",
  templateUrl: "./register.component.html",
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
export default class RegisterComponent {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private router: Router = inject(Router);
  private cms: ClassMapperService = inject(ClassMapperService);

  registerData: RegisterData = {
    name: "",
    pass: "",
    conf: "",
  };
  registerNameError: WritableSignal<boolean> = signal<boolean>(false);
  registerPassError: WritableSignal<boolean> = signal<boolean>(false);
  registerSending: WritableSignal<boolean> = signal<boolean>(false);

  doRegister(): void {
    if (
      this.registerData.name === "" ||
      this.registerData.pass === "" ||
      this.registerData.conf === ""
    ) {
      return;
    }

    this.registerNameError.set(false);
    this.registerPassError.set(false);
    if (this.registerData.pass !== this.registerData.conf) {
      this.registerPassError.set(true);
      return;
    }

    this.registerSending.set(true);
    this.as
      .register(this.registerData)
      .subscribe((result: LoginResult): void => {
        this.registerSending.set(false);
        if (result.status === "ok") {
          this.us.logged = true;
          this.us.user = this.cms.getUser(result.user);
          this.us.saveLogin();

          this.router.navigate(["/main"]);
        } else {
          this.registerNameError.set(true);
        }
      });
  }
}
