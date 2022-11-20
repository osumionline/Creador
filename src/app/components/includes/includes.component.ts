import { Component } from "@angular/core";
import { ProjectDataResult } from "src/app/interfaces/interfaces";
import { IncludeType } from "src/app/model/include-type.model";

@Component({
  selector: "app-includes",
  templateUrl: "./includes.component.html",
  styleUrls: ["../../pages/project/project.component.scss"],
})
export class IncludesComponent {
  includeTypes: IncludeType[] = [];

  constructor() {}

  load(data: ProjectDataResult): void {
    for (let i in this.includeTypes) {
      if (data.includes.indexOf(this.includeTypes[i].id) != -1) {
        const opt_ind: number = data.includes.indexOf(this.includeTypes[i].id);
        if (opt_ind !== -1) {
          this.includeTypes[i].selected = true;
        }
      }
    }
  }

  setIncludeTypes(includeTypes: IncludeType[]): void {
    this.includeTypes = includeTypes;
    console.log(this.includeTypes);
  }

  getIncludeTypes(): IncludeType[] {
    return this.includeTypes;
  }

  removeSelectedInclude(ev: MouseEvent, inc: IncludeType): void {
    ev.preventDefault();
    delete inc.selected;
  }
}
