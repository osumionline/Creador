import { KeyValueInterface } from "src/app/interfaces/interfaces";
import { Utils } from "src/app/model/utils.class";

export class KeyValue {
  constructor(public key: string = null, public value: string = null) {}

  fromInterface(kv: KeyValueInterface): KeyValue {
    this.key = Utils.urldecode(kv.key);
    this.value = Utils.urldecode(kv.value);

    return this;
  }

  toInterface(): KeyValueInterface {
    return {
      key: Utils.urlencode(this.key),
      value: Utils.urlencode(this.value),
    };
  }
}
