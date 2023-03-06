import { ProjectInterface } from "src/app/interfaces/interfaces";
import { Utils } from "src/app/model/utils.class";

export class Project {
  constructor(
    public id: number = null,
    public name: string = "Nuevo proyecto",
    public slug: string = "nuevo-proyecto",
    public description: string = "",
    public updatedAt: string = "",
    public lastCompilationDate: string = ""
  ) {}

  fromInterface(p: ProjectInterface): Project {
    this.id = p.id;
    this.name = Utils.urldecode(p.name);
    this.slug = p.slug;
    this.description = Utils.urldecode(p.description);
    this.updatedAt = p.updatedAt;
    this.lastCompilationDate = p.lastCompilationDate;

    return this;
  }

  toInterface(): ProjectInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      slug: this.slug,
      description: Utils.urlencode(this.description),
      updatedAt: this.updatedAt,
      lastCompilationDate: this.lastCompilationDate,
    };
  }
}
