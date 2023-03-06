import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  ConfigurationRow,
  NewConfigurationItem,
  ProjectDataResult,
} from "src/app/interfaces/interfaces";
import { KeyValue } from "src/app/model/key-value.model";
import { ProjectConfigurationLists } from "src/app/model/project-configuration-lists.model";
import { ProjectConfiguration } from "src/app/model/project-configuration.model";
import { MaterialModule } from "src/app/modules/material/material.module";

@Component({
  standalone: true,
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class ConfigurationComponent {
  projectConfiguration: ProjectConfiguration = new ProjectConfiguration();
  projectConfigurationLists: ProjectConfigurationLists =
    new ProjectConfigurationLists();
  newItem: NewConfigurationItem = {
    css: "",
    cssExt: "",
    js: "",
    jsExt: "",
    libs: "",
    extraKey: "",
    extraValue: "",
    dirKey: "",
    dirValue: "",
  };
  row: ConfigurationRow = {
    general: true,
    db: false,
    cookies: false,
    errors: false,
    css: false,
    js: false,
    libs: false,
    extra: false,
    dir: false,
  };

  load(data: ProjectDataResult): void {
    this.projectConfiguration = new ProjectConfiguration().fromInterface(
      data.configuration
    );
    this.projectConfigurationLists =
      new ProjectConfigurationLists().fromInterface(data.lists);
  }

  getConfiguration(): ProjectConfiguration {
    return this.projectConfiguration;
  }

  getConfigurationLists(): ProjectConfigurationLists {
    return this.projectConfigurationLists;
  }

  deploy(ind: string): void {
    this.row[ind] = !this.row[ind];
  }

  changeHasDB(): void {
    this.projectConfiguration.hasDB = !this.projectConfiguration.hasDB;
  }

  addNew(type: string): void {
    switch (type) {
      case "css":
      case "cssExt":
      case "js":
      case "jsExt":
      case "libs":
        this.projectConfigurationLists[type].push(this.newItem[type]);
        this.newItem[type] = "";
        break;
      case "extra":
        this.projectConfigurationLists.extra.push(
          new KeyValue(this.newItem.extraKey, this.newItem.extraValue)
        );
        this.newItem.extraKey = "";
        this.newItem.extraValue = "";
        break;
      case "dir":
        this.projectConfigurationLists.dir.push(
          new KeyValue(this.newItem.dirKey, this.newItem.dirValue)
        );
        this.newItem.dirKey = "";
        this.newItem.dirValue = "";
        break;
    }
  }

  deleteNew(type: string, ind: number): void {
    this.projectConfigurationLists[type].splice(ind, 1);
  }
}
