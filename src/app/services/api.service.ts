import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs';
import { environment }             from 'src/environments/environment';

import {
	LoginDataInterface,
	LoginResult,
	RegisterData,
	ProjectResult,
	IncludeResult,
	StatusResult,
	ProjectInterface,
	ProjectConfigurationInterface,
	ProjectConfigurationListsInterface,
	ModelInterface,
	IncludeTypeInterface,
	ProjectDataResult,
	ProjectDownloadResult,
	PluginsRep
} from 'src/app/interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	apiUrl = environment.apiUrl;

	constructor(private http : HttpClient){}

	login(data: LoginDataInterface): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'login', data);
	}

	register(data: RegisterData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'register', data);
	}

	saveSettings(data: RegisterData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'saveSettings', data);
	}

	getProjects(): Observable<ProjectResult> {
		return this.http.post<ProjectResult>(this.apiUrl + 'get-projects', {});
	}

	getIncludes(): Observable<IncludeResult> {
		return this.http.post<IncludeResult>(this.apiUrl + 'get-includes', {});
	}

	saveProject(project: ProjectInterface, projectConfiguration: ProjectConfigurationInterface, projectConfigurationLists: ProjectConfigurationListsInterface, projectModel: ModelInterface[], includeTypes: IncludeTypeInterface[]): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'save-project', {project, projectConfiguration, projectConfigurationLists, projectModel, includeTypes});
	}

	getProject(id: number): Observable<ProjectDataResult> {
		return this.http.post<ProjectDataResult>(this.apiUrl + 'get-project', {id});
	}

	deleteProject(id: number): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'delete-project', {id});
	}

	generateProject(id: number, step: number): Observable<ProjectDownloadResult> {
		return this.http.post<ProjectDownloadResult>(this.apiUrl + 'generate-project', {id, step});
	}

	getPluginList(): Observable<PluginsRep> {
		return this.http.post<PluginsRep>(this.apiUrl + 'get-plugin-list', {});
	}
}
