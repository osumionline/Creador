import { ProjectPluginInterface } from "@interfaces/interfaces";

export default class ProjectPlugin {
  constructor(
    public id: number = null,
    public name: string = null,
    public version: string = null
  ) {}

  fromInterface(p: ProjectPluginInterface): ProjectPlugin {
    this.id = p.id;
    this.name = p.name;
    this.version = p.version;

    return this;
  }

  toInterface(): ProjectPluginInterface {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
    };
  }
}
