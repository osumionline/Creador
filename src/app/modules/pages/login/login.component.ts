import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { LoginDataInterface, LoginResult } from "src/app/interfaces/interfaces";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { UserService } from "src/app/services/user.service";

@Component({
  standalone: true,
  selector: "app-login",
  templateUrl: "./login.component.html",
  imports: [
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginData: LoginDataInterface = {
    name: "",
    pass: "",
  };
  loginError: boolean = false;
  loginSending: boolean = false;

  constructor(
    private as: ApiService,
    private us: UserService,
    private router: Router,
    private auth: AuthService,
    private cms: ClassMapperService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  doLogin(): void {
    if (this.loginData.name === "" || this.loginData.pass === "") {
      return;
    }

    this.loginSending = true;
    this.as.login(this.loginData).subscribe((result: LoginResult): void => {
      this.loginSending = false;
      if (result.status === "ok") {
        this.us.logged = true;
        this.us.user = this.cms.getUser(result.user);
        this.us.saveLogin();

        this.router.navigate(["/main"]);
      } else {
        this.loginError = true;
      }
    });
  }
}
