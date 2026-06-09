import { ModelRowInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class ModelRow {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public type: number | null = null,
    public size: number | null = null,
    public autoIncrement: boolean = false,
    public nullable: boolean = true,
    public defaultValue: string | null = null,
    public ref: string | null = null,
    public comment: string | null = null,
    public order: number | null = null,
  ) {}

  fromInterface(mr: ModelRowInterface): ModelRow {
    this.id = mr.id;
    this.name = urldecode(mr.name);
    this.type = mr.type;
    this.size = mr.size;
    this.autoIncrement = mr.autoIncrement;
    this.nullable = mr.nullable;
    this.defaultValue = urldecode(mr.defaultValue);
    this.ref = urldecode(mr.ref);
    this.comment = urldecode(mr.comment);
    this.order = mr.order;

    return this;
  }

  toInterface(): ModelRowInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      type: this.type,
      size: this.size,
      autoIncrement: this.autoIncrement,
      nullable: this.nullable,
      defaultValue: urlencode(this.defaultValue),
      ref: urlencode(this.ref),
      comment: urlencode(this.comment),
      order: this.order,
    };
  }
}
