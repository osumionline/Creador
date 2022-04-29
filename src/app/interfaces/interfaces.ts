export interface LoginDataInterface {
	name: string;
	pass: string;
}

export interface UserInterface {
	id: number;
	name: string;
	token: string;
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
	id: number;
	name: string;
	slug: string;
	description: string;
	updatedAt: string;
	lastCompilationDate: string;
}

export interface ProjectResult {
	status: string;
	list: ProjectInterface[];
}

export interface ProjectConfigurationInterface {
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

export interface KeyValueInterface {
	key: string;
	value: string;
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

export interface ModelRowInterface {
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

export interface ModelInterface {
	id: number;
	name: string;
	tableName: string;
	rows: ModelRowInterface[];
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

export interface ProjectDataResult {
	status: string;
	project: ProjectInterface;
	configuration: ProjectConfigurationInterface;
	lists: ProjectConfigurationListsInterface;
	models: ModelInterface[];
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