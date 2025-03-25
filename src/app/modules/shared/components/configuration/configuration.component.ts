import { Component, model, ModelSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { ConfigurationRow, NewConfigurationItem } from "@interfaces/interfaces";
import KeyValue from "@model/key-value.model";
import ProjectConfigurationLists from "@model/project-configuration-lists.model";
import ProjectConfiguration from "@model/project-configuration.model";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconModule,
    MatSlideToggle,
    MatButton,
  ],
})
export default class ConfigurationComponent {
  projectConfiguration: ModelSignal<ProjectConfiguration> =
    model.required<ProjectConfiguration>();
  projectConfigurationLists: ModelSignal<ProjectConfigurationLists> =
    model.required<ProjectConfigurationLists>();
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

  deploy(ind: string): void {
    this.row[ind] = !this.row[ind];
  }

  changeHasDB(): void {
    this.projectConfiguration.update(
      (value: ProjectConfiguration): ProjectConfiguration => {
        value.hasDB = !value.hasDB;
        return value;
      }
    );
  }

  addNew(type: string): void {
    switch (type) {
      case "css":
      case "cssExt":
      case "js":
      case "jsExt":
      case "libs":
        this.projectConfigurationLists.update(
          (value: ProjectConfigurationLists): ProjectConfigurationLists => {
            value[type].push(this.newItem[type]);
            return value;
          }
        );
        this.newItem[type] = "";
        break;
      case "extra":
        this.projectConfigurationLists.update(
          (value: ProjectConfigurationLists): ProjectConfigurationLists => {
            value.extra.push(
              new KeyValue(this.newItem.extraKey, this.newItem.extraValue)
            );
            return value;
          }
        );
        this.newItem.extraKey = "";
        this.newItem.extraValue = "";
        break;
      case "dir":
        this.projectConfigurationLists.update(
          (value: ProjectConfigurationLists): ProjectConfigurationLists => {
            value.dir.push(
              new KeyValue(this.newItem.dirKey, this.newItem.dirValue)
            );
            return value;
          }
        );
        this.newItem.dirKey = "";
        this.newItem.dirValue = "";
        break;
    }
  }

  deleteNew(type: string, ind: number): void {
    this.projectConfigurationLists.update(
      (value: ProjectConfigurationLists): ProjectConfigurationLists => {
        value[type].splice(ind, 1);
        return value;
      }
    );
  }
}
