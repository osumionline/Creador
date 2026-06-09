import { Service } from '@angular/core';
import User from '@model/user.model';

@Service()
export default class UserService {
  logged: boolean = false;
  user: User | null = null;

  loadLogin(): void {
    const loginObj: string | null = localStorage.getItem('login');
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      this.user = new User().fromInterface(JSON.parse(loginObj));
    }
  }

  saveLogin(): void {
    if (this.user) {
      localStorage.setItem('login', JSON.stringify(this.user.toInterface()));
    }
  }

  logout(): void {
    this.logged = false;
    this.user = null;
    localStorage.removeItem('login');
  }
}
