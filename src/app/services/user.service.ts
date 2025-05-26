import { Injectable } from "@angular/core";
import User from "@model/user.model";

@Injectable({
  providedIn: "root",
})
export default class UserService {
  logged: boolean = false;
  user: User = null;

  loadLogin(): void {
    const loginObj: string = localStorage.getItem("login");
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      this.user = new User().fromInterface(JSON.parse(loginObj));
    }
  }

  saveLogin(): void {
    localStorage.setItem("login", JSON.stringify(this.user.toInterface()));
  }

  logout(): void {
    this.logged = false;
    this.user = null;
    localStorage.removeItem("login");
  }
}
