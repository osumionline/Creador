import {
  IncludeTypeInterface,
  IncludeVersionInterface,
} from "@interfaces/interfaces";
import IncludeVersion from "@model/include-version.model";
import { urldecode, urlencode } from "@osumi/tools";

export default class IncludeType {
  selected: boolean = false;

  constructor(
    public id: number = null,
    public name: string = null,
    public versions: IncludeVersion[] = []
  ) {}

  fromInterface(it: IncludeTypeInterface): IncludeType {
    this.id = it.id;
    this.name = urldecode(it.name);
    this.versions = it.versions.map(
      (item: IncludeVersionInterface): IncludeVersion => {
        return new IncludeVersion().fromInterface(item);
      }
    );

    return this;
  }

  toInterface(): IncludeTypeInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      versions: this.versions.map(
        (item: IncludeVersion): IncludeVersionInterface => item.toInterface()
      ),
    };
  }
}
