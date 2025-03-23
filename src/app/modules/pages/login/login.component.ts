import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatAnchor, MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { LoginDataInterface, LoginResult } from "@interfaces/interfaces";
import ApiService from "@services/api.service";
import AuthService from "@services/auth.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    FormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatAnchor,
  ],
})
export default class LoginComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private router: Router = inject(Router);
  private auth: AuthService = inject(AuthService);
  private cms: ClassMapperService = inject(ClassMapperService);

  loginData: LoginDataInterface = {
    name: "",
    pass: "",
  };
  loginError: WritableSignal<boolean> = signal<boolean>(false);
  loginSending: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  doLogin(): void {
    if (this.loginData.name === "" || this.loginData.pass === "") {
      return;
    }

    this.loginSending.set(true);
    this.as.login(this.loginData).subscribe((result: LoginResult): void => {
      this.loginSending.set(false);
      if (result.status === "ok") {
        this.us.logged = true;
        this.us.user = this.cms.getUser(result.user);
        this.us.saveLogin();

        this.router.navigate(["/main"]);
      } else {
        this.loginError.set(true);
      }
    });
  }
}
