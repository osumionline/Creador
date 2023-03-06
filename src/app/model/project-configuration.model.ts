import { ProjectConfigurationInterface } from "src/app/interfaces/interfaces";
import { Utils } from "src/app/model/utils.class";

export class ProjectConfiguration {
  constructor(
    public baseUrl: string = "",
    public adminEmail: string = "",
    public defaultTitle: string = "",
    public lang: string = "es",
    public hasDB: boolean = false,
    public dbHost: string = "",
    public dbName: string = "",
    public dbUser: string = "",
    public dbPass: string = null,
    public dbCharset: string = "utf8mb4",
    public dbCollate: string = "utf8mb4_unicode_ci",
    public cookiesPrefix: string = "",
    public cookiesUrl: string = "",
    public error403: string = "",
    public error404: string = "",
    public error500: string = ""
  ) {}

  fromInterface(pc: ProjectConfigurationInterface): ProjectConfiguration {
    this.baseUrl = Utils.urldecode(pc.baseUrl);
    this.adminEmail = Utils.urldecode(pc.adminEmail);
    this.defaultTitle = Utils.urldecode(pc.defaultTitle);
    this.lang = Utils.urldecode(pc.lang);
    this.hasDB = pc.hasDB;
    this.dbHost = Utils.urldecode(pc.dbHost);
    this.dbName = Utils.urldecode(pc.dbName);
    this.dbUser = Utils.urldecode(pc.dbUser);
    this.dbPass = Utils.urldecode(pc.dbPass);
    this.dbCharset = Utils.urldecode(pc.dbCharset);
    this.dbCollate = Utils.urldecode(pc.dbCollate);
    this.cookiesPrefix = Utils.urldecode(pc.cookiesPrefix);
    this.cookiesUrl = Utils.urldecode(pc.cookiesUrl);
    this.error403 = Utils.urldecode(pc.error403);
    this.error404 = Utils.urldecode(pc.error404);
    this.error500 = Utils.urldecode(pc.error500);

    return this;
  }

  toInterface(): ProjectConfigurationInterface {
    return {
      baseUrl: Utils.urlencode(this.baseUrl),
      adminEmail: Utils.urlencode(this.adminEmail),
      defaultTitle: Utils.urlencode(this.defaultTitle),
      lang: Utils.urlencode(this.lang),
      hasDB: this.hasDB,
      dbHost: Utils.urlencode(this.dbHost),
      dbName: Utils.urlencode(this.dbName),
      dbUser: Utils.urlencode(this.dbUser),
      dbPass: Utils.urlencode(this.dbPass),
      dbCharset: Utils.urlencode(this.dbCharset),
      dbCollate: Utils.urlencode(this.dbCollate),
      cookiesPrefix: Utils.urlencode(this.cookiesPrefix),
      cookiesUrl: Utils.urlencode(this.cookiesUrl),
      error403: Utils.urlencode(this.error403),
      error404: Utils.urlencode(this.error404),
      error500: Utils.urlencode(this.error500),
    };
  }
}
