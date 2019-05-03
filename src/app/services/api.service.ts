import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs';
import { environment }             from '../../environments/environment';

import {
  LoginData,
  LoginResult,
  RegisterData,
  ProjectResult,
  IncludeResult,
  StatusResult,
  Project,
  ProjectConfiguration,
  ProjectConfigurationLists,
  Model,
  IncludeType,
  ProjectDataResult
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;

  constructor(private http : HttpClient){}

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }

  register(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'register', data);
  }

  getProjects(): Observable<ProjectResult> {
    return this.http.post<ProjectResult>(this.apiUrl + 'get-projects', {});
  }

  getIncludes(): Observable<IncludeResult> {
    return this.http.post<IncludeResult>(this.apiUrl + 'get-includes', {});
  }

  saveProject(project: Project, projectConfiguration: ProjectConfiguration, projectConfigurationLists: ProjectConfigurationLists, projectModel: Model[], includeTypes: IncludeType[]): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'save-project', {project, projectConfiguration, projectConfigurationLists, projectModel, includeTypes});
  }

  getProject(id: number): Observable<ProjectDataResult> {
    return this.http.post<ProjectDataResult>(this.apiUrl + 'get-project', {id});
  }

  deleteProject(id: number): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'delete-project', {id});
  }
  
  generateProject(step: number): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'generate-project', {step});
  }
}