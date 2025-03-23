import {
  KeyValueInterface,
  ProjectConfigurationListsInterface,
} from "@interfaces/interfaces";
import KeyValue from "@model/key-value.model";
import { urldecode, urlencode } from "@osumi/tools";

export default class ProjectConfigurationLists {
  constructor(
    public css: string[] = [],
    public cssExt: string[] = [],
    public js: string[] = [],
    public jsExt: string[] = [],
    public libs: string[] = [],
    public extra: KeyValue[] = [],
    public dir: KeyValue[] = []
  ) {}

  fromInterface(
    pcl: ProjectConfigurationListsInterface
  ): ProjectConfigurationLists {
    this.css = pcl.css.map(urldecode);
    this.cssExt = pcl.cssExt.map(urldecode);
    this.js = pcl.js.map(urldecode);
    this.jsExt = pcl.jsExt.map(urldecode);
    this.libs = pcl.libs.map(urldecode);
    this.extra = pcl.extra.map((item: KeyValueInterface): KeyValue => {
      return new KeyValue().fromInterface(item);
    });
    this.dir = pcl.dir.map((item: KeyValueInterface): KeyValue => {
      return new KeyValue().fromInterface(item);
    });

    return this;
  }

  toInterface(): ProjectConfigurationListsInterface {
    return {
      css: this.css.map(urlencode),
      cssExt: this.cssExt.map(urlencode),
      js: this.js.map(urlencode),
      jsExt: this.jsExt.map(urlencode),
      libs: this.libs.map(urlencode),
      extra: this.extra.map((item: KeyValue): KeyValueInterface => {
        return item.toInterface();
      }),
      dir: this.dir.map((item: KeyValue): KeyValueInterface => {
        return item.toInterface();
      }),
    };
  }
}
