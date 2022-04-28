import { Injectable }       from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { UserInterface }    from 'src/app/interfaces/interfaces';
import { User }             from 'src/app/model/user.model';

@Injectable()
export class UserService {
	logged: boolean = false;
	user: User = null;

	constructor(private dss: DataShareService) {}

	loadLogin(): void {
		const loginObj: UserInterface = this.dss.getGlobal('login');
		if (loginObj === null){
			this.logout();
		}
		else {
			this.logged = true;
			this.user = new User().fromInterface(loginObj);
		}
	}

	saveLogin() {
		this.dss.setGlobal('login', this.user.toInterface());
	}

	logout() {
		this.logged = false;
		this.user = null;
		this.dss.removeGlobal('login');
	}
}