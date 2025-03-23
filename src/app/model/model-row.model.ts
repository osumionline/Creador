import { ModelRowInterface } from "@interfaces/interfaces";

export default class ModelRow {
  constructor(
    public id: number = null,
    public name: string = null,
    public type: number = null,
    public size: number = null,
    public autoIncrement: boolean = false,
    public nullable: boolean = true,
    public defaultValue: string = null,
    public ref: string = null,
    public comment: string = null,
    public order: number = null
  ) {}

  fromInterface(mr: ModelRowInterface): ModelRow {
    this.id = mr.id;
    this.name = mr.name;
    this.type = mr.type;
    this.size = mr.size;
    this.autoIncrement = mr.autoIncrement;
    this.nullable = mr.nullable;
    this.defaultValue = mr.defaultValue;
    this.ref = mr.ref;
    this.comment = mr.comment;
    this.order = mr.order;

    return this;
  }

  toInterface(): ModelRowInterface {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      size: this.size,
      autoIncrement: this.autoIncrement,
      nullable: this.nullable,
      defaultValue: this.defaultValue,
      ref: this.ref,
      comment: this.comment,
      order: this.order,
    };
  }
}
