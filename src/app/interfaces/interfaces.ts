export interface LoginDataInterface {
  name: string;
  pass: string;
}

export interface UserInterface {
  id: number | null;
  name: string | null;
  token: string | null;
}

export interface LoginResult {
  status: string;
  user: UserInterface;
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

export interface ProjectInterface {
  id: number | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  updatedAt: string | null;
  lastCompilationDate: string | null;
}

export interface ProjectResult {
  status: string;
  list: ProjectInterface[];
}

export interface ProjectConfigurationInterface {
  baseUrl: string | null;
  adminEmail: string | null;
  defaultTitle: string | null;
  lang: string | null;
  hasDB: boolean;
  dbHost: string | null;
  dbName: string | null;
  dbUser: string | null;
  dbPass: string | null;
  dbCharset: string | null;
  dbCollate: string | null;
  cookiesPrefix: string | null;
  cookiesUrl: string | null;
  error403: string | null;
  error404: string | null;
  error500: string | null;
}

export interface KeyValueInterface {
  key: string | null;
  value: string | null;
}

export interface ProjectConfigurationListsInterface {
  css: string[];
  cssExt: string[];
  js: string[];
  jsExt: string[];
  libs: string[];
  extra: KeyValueInterface[];
  dir: KeyValueInterface[];
}

export interface NewConfigurationItem {
  css: string;
  cssExt: string;
  js: string;
  jsExt: string;
  libs: string;
  extraKey: string;
  extraValue: string;
  dirKey: string;
  dirValue: string;
}

export interface ConfigurationRow {
  general: boolean;
  db: boolean;
  cookies: boolean;
  errors: boolean;
  css: boolean;
  js: boolean;
  libs: boolean;
  extra: boolean;
  dir: boolean;
}

export interface ModelRowTypeInterface {
  id: number;
  name: string;
}

export interface ModelRowInterface {
  id: number | null;
  name: string | null;
  type: number | null;
  size: number | null;
  autoIncrement: boolean;
  nullable: boolean;
  defaultValue: string | null;
  ref: string | null;
  comment: string | null;
  order: number | null;
}

export interface ModelInterface {
  id: number | null;
  name: string | null;
  tableName: string | null;
  rows: ModelRowInterface[];
}

export interface IncludeVersionInterface {
  id: number | null;
  version: string | null;
}

export interface IncludeTypeInterface {
  id: number | null;
  name: string | null;
  versions: IncludeVersionInterface[];
}

export interface IncludeResult {
  status: string;
  list: IncludeTypeInterface[];
}

export interface ProjectPluginInterface {
  id: number | null;
  name: string | null;
  version: string | null;
}

export interface ProjectDataResult {
  status: string;
  project: ProjectInterface;
  configuration: ProjectConfigurationInterface;
  lists: ProjectConfigurationListsInterface;
  models: ModelInterface[];
  includes: number[];
  plugins: ProjectPluginInterface[];
}

export interface ProjectDownloadResult {
  status: string;
  date: string;
}

export interface PluginsRep {
  plugins: PluginInterface[];
}

export interface PluginInterface {
  name: string | null;
  version: string | null;
  description: string | null;
}
