import { PluginInterface } from "@interfaces/interfaces";

export default class Plugin {
  selected: boolean = false;

  constructor(
    public name: string = "",
    public version: string = "",
    public description: string = ""
  ) {}

  fromInterface(p: PluginInterface): Plugin {
    this.name = p.name;
    this.version = p.version;
    this.description = p.description;

    return this;
  }

  toInterface(): PluginInterface {
    return {
      name: this.name,
      version: this.version,
      description: this.description,
    };
  }
}
