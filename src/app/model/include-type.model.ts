import { IncludeTypeInterface } from "src/app/interfaces/interfaces";
import { IncludeVersion } from "src/app/model/include-version.model";
import { Utils } from "src/app/model/utils.class";

export class IncludeType {
  selected: boolean = false;

  constructor(
    public id: number = null,
    public name: string = null,
    public versions: IncludeVersion[] = []
  ) {}

  fromInterface(it: IncludeTypeInterface): IncludeType {
    this.id = it.id;
    this.name = Utils.urldecode(it.name);
    this.versions = it.versions.map((item) => {
      return new IncludeVersion().fromInterface(item);
    });

    return this;
  }

  toInterface(): IncludeTypeInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      versions: this.versions.map((item) => item.toInterface()),
    };
  }
}
