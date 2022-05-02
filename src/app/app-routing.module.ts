import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent }    from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { MainComponent }     from 'src/app/pages/main/main.component';
import { ProjectComponent }  from 'src/app/pages/project/project.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { AuthGuard }         from 'src/app/guard/auth.guard';

const routes: Routes = [
	{ path: '',                  component: LoginComponent },
	{ path: 'register',          component: RegisterComponent },
	{ path: 'main',              component: MainComponent,     canActivate: [AuthGuard] },
	{ path: 'new-project',       component: ProjectComponent,  canActivate: [AuthGuard] },
	{ path: 'project/:id/:slug', component: ProjectComponent,  canActivate: [AuthGuard] },
	{ path: 'settings',          component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
