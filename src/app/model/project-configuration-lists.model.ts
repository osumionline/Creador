import {
  KeyValueInterface,
  ProjectConfigurationListsInterface,
} from "src/app/interfaces/interfaces";
import { KeyValue } from "src/app/model/key-value.model";
import { Utils } from "src/app/model/utils.class";

export class ProjectConfigurationLists {
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
    this.css = pcl.css.map(Utils.urldecode);
    this.cssExt = pcl.cssExt.map(Utils.urldecode);
    this.js = pcl.js.map(Utils.urldecode);
    this.jsExt = pcl.jsExt.map(Utils.urldecode);
    this.libs = pcl.libs.map(Utils.urldecode);
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
      css: this.css.map(Utils.urlencode),
      cssExt: this.cssExt.map(Utils.urlencode),
      js: this.js.map(Utils.urlencode),
      jsExt: this.jsExt.map(Utils.urlencode),
      libs: this.libs.map(Utils.urlencode),
      extra: this.extra.map((item: KeyValue): KeyValueInterface => {
        return item.toInterface();
      }),
      dir: this.dir.map((item: KeyValue): KeyValueInterface => {
        return item.toInterface();
      }),
    };
  }
}
