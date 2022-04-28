import { BrowserModule }                       from '@angular/platform-browser';
import { NgModule }                            from '@angular/core';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }                         from '@angular/forms';
import { AppRoutingModule }                    from 'src/app/app-routing.module';
import { AppComponent }                        from 'src/app/app.component';
import { environment }                         from 'src/environments/environment';
import { TokenInterceptor }                    from 'src/app/interceptors/token.interceptor';

import { PAGES, COMPONENTS, PIPES, SERVICES, MATERIAL } from './app.common';

@NgModule({
	declarations: [
		AppComponent,
		...PAGES,
		...COMPONENTS,
		...PIPES
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		...MATERIAL
	],
	providers: [
		...SERVICES,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}