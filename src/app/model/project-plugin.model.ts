import { ProjectPluginInterface } from '@interfaces/interfaces';

export default class ProjectPlugin {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public version: string | null = null,
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
