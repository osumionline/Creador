import {
  ModelInterface,
  ModelRowInterface,
} from "src/app/interfaces/interfaces";
import { ModelRow } from "src/app/model/model-row.model";

export class Model {
  open: boolean = false;

  constructor(
    public id: number = null,
    public name: string = "",
    public tableName: string = "",
    public rows: ModelRow[] = []
  ) {}

  fromInterface(m: ModelInterface): Model {
    this.id = m.id;
    this.name = m.name;
    this.tableName = m.tableName;
    this.rows = m.rows.map((item: ModelRowInterface): ModelRow => {
      return new ModelRow().fromInterface(item);
    });

    return this;
  }

  toInterface(): ModelInterface {
    return {
      id: this.id,
      name: this.name,
      tableName: this.tableName,
      rows: this.rows.map((item: ModelRow): ModelRowInterface => {
        return item.toInterface();
      }),
    };
  }
}
