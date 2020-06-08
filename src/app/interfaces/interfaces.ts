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
  updatedAt: string;
  lastCompilationDate: string;
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
  dbCharset: string;
  dbCollate: string;
  cookiesPrefix: string;
  cookiesUrl: string;
  error403: string;
  error404: string;
  error500: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface ProjectConfigurationLists {
  css: string[];
  cssExt: string[];
  js: string[];
  jsExt: string[];
  libs: string[];
  extra: KeyValue[];
  dir: KeyValue[];
}

export interface ModelRow {
  id: number;
  name: string;
  type: number;
  size: number;
  autoIncrement: boolean;
  nullable: boolean;
  defaultValue: string;
  ref: string;
  comment: string;
  order: number;
}

export interface Model {
  id: number;
  name: string;
  tableName: string;
  rows: ModelRow[];
}

export interface IncludeVersion {
  id: number;
  version: string;
}

export interface IncludeType {
  id: number;
  versions: IncludeVersion[];
  selected?: boolean;
}

export interface IncludeResult {
  status: string;
  list: IncludeType[];
}

export interface StatusResult {
  status: string;
}

export interface ProjectDataResult {
  status: string;
  project: Project;
  configuration: ProjectConfiguration;
  lists: ProjectConfigurationLists;
  models: Model[];
  includes: number[];
}

export interface ProjectDownloadResult {
  status: string;
  date: string;
}

export interface PluginsRep {
	plugins: PluginRep[];
}

export interface PluginRep {
	name: string;
	version: string;
	description: string;
}