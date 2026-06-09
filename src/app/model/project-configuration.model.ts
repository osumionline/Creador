import { ProjectConfigurationInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class ProjectConfiguration {
  constructor(
    public baseUrl: string | null = null,
    public adminEmail: string | null = null,
    public defaultTitle: string | null = null,
    public lang: string | null = 'es',
    public hasDB: boolean = false,
    public dbHost: string | null = null,
    public dbName: string | null = null,
    public dbUser: string | null = null,
    public dbPass: string | null = null,
    public dbCharset: string | null = 'utf8mb4',
    public dbCollate: string | null = 'utf8mb4_unicode_ci',
    public cookiesPrefix: string | null = null,
    public cookiesUrl: string | null = null,
    public error403: string | null = null,
    public error404: string | null = null,
    public error500: string | null = null,
  ) {}

  fromInterface(pc: ProjectConfigurationInterface): ProjectConfiguration {
    this.baseUrl = urldecode(pc.baseUrl);
    this.adminEmail = urldecode(pc.adminEmail);
    this.defaultTitle = urldecode(pc.defaultTitle);
    this.lang = urldecode(pc.lang);
    this.hasDB = pc.hasDB;
    this.dbHost = urldecode(pc.dbHost);
    this.dbName = urldecode(pc.dbName);
    this.dbUser = urldecode(pc.dbUser);
    this.dbPass = urldecode(pc.dbPass);
    this.dbCharset = urldecode(pc.dbCharset);
    this.dbCollate = urldecode(pc.dbCollate);
    this.cookiesPrefix = urldecode(pc.cookiesPrefix);
    this.cookiesUrl = urldecode(pc.cookiesUrl);
    this.error403 = urldecode(pc.error403);
    this.error404 = urldecode(pc.error404);
    this.error500 = urldecode(pc.error500);

    return this;
  }

  toInterface(): ProjectConfigurationInterface {
    return {
      baseUrl: urlencode(this.baseUrl),
      adminEmail: urlencode(this.adminEmail),
      defaultTitle: urlencode(this.defaultTitle),
      lang: urlencode(this.lang),
      hasDB: this.hasDB,
      dbHost: urlencode(this.dbHost),
      dbName: urlencode(this.dbName),
      dbUser: urlencode(this.dbUser),
      dbPass: urlencode(this.dbPass),
      dbCharset: urlencode(this.dbCharset),
      dbCollate: urlencode(this.dbCollate),
      cookiesPrefix: urlencode(this.cookiesPrefix),
      cookiesUrl: urlencode(this.cookiesUrl),
      error403: urlencode(this.error403),
      error404: urlencode(this.error404),
      error500: urlencode(this.error500),
    };
  }
}
