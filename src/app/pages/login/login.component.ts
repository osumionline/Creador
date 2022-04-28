import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { LoginData }         from 'src/app/interfaces/interfaces';
import { ApiService }        from 'src/app/services/api.service';
import { UserService }       from 'src/app/services/user.service';
import { CommonService }     from 'src/app/services/common.service';
import { DataShareService }  from 'src/app/services/data-share.service';
import { AuthService }       from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
	loginData = {
		name: '',
		pass: ''
	} as LoginData;
	loginError: boolean = false;
	loginSending: boolean = false;

	constructor(private as: ApiService,
				private user: UserService,
				private cs: CommonService,
				private router: Router,
				private dss: DataShareService,
				private auth: AuthService) {}
	ngOnInit() {
		if (this.auth.isAuthenticated()){
			this.router.navigate(['/home']);
		}
	}

	doLogin(ev) {
		ev.preventDefault();

		if (this.loginData.name==='' || this.loginData.pass===''){
			return false;
		}

		this.loginSending = true;
		this.as.login(this.loginData).subscribe(result => {
			this.loginSending = false;
			if (result.status==='ok'){
				this.user.logged = true;
				this.user.id     = result.id;
				this.user.name   = this.cs.urldecode(result.name);
				this.user.token  = this.cs.urldecode(result.token);
				this.user.saveLogin();

				this.router.navigate(['/main']);
			}
			else{
				this.loginError = true;
			}
		});
	}
}