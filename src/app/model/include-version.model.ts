import { IncludeVersionInterface } from "@interfaces/interfaces";

export default class IncludeVersion {
  constructor(public id: number = null, public version: string = null) {}

  fromInterface(iv: IncludeVersionInterface): IncludeVersion {
    this.id = iv.id;
    this.version = iv.version;

    return this;
  }

  toInterface(): IncludeVersionInterface {
    return {
      id: this.id,
      version: this.version,
    };
  }
}
