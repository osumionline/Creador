import { ModelInterface, ModelRowInterface } from "@interfaces/interfaces";
import ModelRow from "@model/model-row.model";
import { urldecode, urlencode } from "@osumi/tools";

export default class Model {
  open: boolean = false;

  constructor(
    public id: number = null,
    public name: string = "",
    public tableName: string = "",
    public rows: ModelRow[] = []
  ) {}

  fromInterface(m: ModelInterface): Model {
    this.id = m.id;
    this.name = urldecode(m.name);
    this.tableName = urldecode(m.tableName);
    this.rows = m.rows.map((item: ModelRowInterface): ModelRow => {
      return new ModelRow().fromInterface(item);
    });

    return this;
  }

  toInterface(): ModelInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      tableName: urlencode(this.tableName),
      rows: this.rows.map((item: ModelRow): ModelRowInterface => {
        return item.toInterface();
      }),
    };
  }
}
