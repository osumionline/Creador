import { KeyValueInterface } from "@interfaces/interfaces";
import { urldecode, urlencode } from "@osumi/tools";

export default class KeyValue {
  constructor(public key: string = null, public value: string = null) {}

  fromInterface(kv: KeyValueInterface): KeyValue {
    this.key = urldecode(kv.key);
    this.value = urldecode(kv.value);

    return this;
  }

  toInterface(): KeyValueInterface {
    return {
      key: urlencode(this.key),
      value: urlencode(this.value),
    };
  }
}
