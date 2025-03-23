import { inject, Injectable } from "@angular/core";
import { UserInterface } from "@interfaces/interfaces";
import User from "@model/user.model";
import DataShareService from "@services/data-share.service";

@Injectable({
  providedIn: "root",
})
export default class UserService {
  private dss: DataShareService = inject(DataShareService);

  logged: boolean = false;
  user: User = null;

  loadLogin(): void {
    const loginObj: UserInterface = this.dss.getGlobal("login");
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      this.user = new User().fromInterface(loginObj);
    }
  }

  saveLogin(): void {
    this.dss.setGlobal("login", this.user.toInterface());
  }

  logout(): void {
    this.logged = false;
    this.user = null;
    this.dss.removeGlobal("login");
  }
}
