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
  baseUrl: string;
  adminEmail: string;
  defaultTitle: string;
  lang: string;
  hasDB: boolean;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
  cookiesPrefix: string;
  cookiesUrl: string;
  modBrowser: boolean;
  modEmail: boolean;
  modEmailSmtp: boolean;
  modFtp: boolean;
  modImage: boolean;
  modPdf: boolean;
  modTranslate: boolean;
  smtpHost: string;
  smtpPort: string;
  smtpSecure: string;
  smtpUser: string;
  smtpPass: string;
  error403: string;
  error404: string;
  error500: string;
}