export interface LoginData {
  name: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  id: number;
  name: string;
  token: string;
}

export interface RegisterData {
  name: string;
  pass: string;
  conf: string;
}

export interface DialogField {
  title: string;
  type: string;
  value: string;
  hint?: string;
}

export interface DialogOptions {
  title: string;
  content: string;
  fields?: DialogField[];
  ok: string;
  cancel?: string;
}

export interface StatusResult {
  status: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProjectResult {
  status: string;
  list: Project[];
}

export interface ProjectConfiguration {
  hasDB: boolean;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
}