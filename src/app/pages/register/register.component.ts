import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { RegisterData }       from 'src/app/interfaces/interfaces';
import { ApiService }         from 'src/app/services/api.service';
import { UserService }        from 'src/app/services/user.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: []
})
export class RegisterComponent {
	registerData: RegisterData = {
		name: '',
		pass: '',
		conf: ''
	};
	registerNameError: boolean = false;
	registerPassError: boolean = false;
	registerSending: boolean = false;

	constructor(
		private as: ApiService,
		private us: UserService,
		private router: Router,
		private cms: ClassMapperService
	) {}

	doRegister(): void {
		if (this.registerData.name==='' || this.registerData.pass==='' || this.registerData.conf==='') {
			return;
		}

		this.registerNameError = false;
		this.registerPassError = false;
		if (this.registerData.pass !== this.registerData.conf) {
			this.registerPassError = true;
			return;
		}

		this.registerSending = true;
		this.as.register(this.registerData).subscribe(result => {
			this.registerSending = false;
			if (result.status==='ok') {
				this.us.logged = true;
				this.us.user = this.cms.getUser(result.user);
				this.us.saveLogin();

				this.router.navigate(['/main']);
			}
			else {
				this.registerNameError = true;
			}
		});
	}
}