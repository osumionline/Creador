import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatList, MatListItem } from "@angular/material/list";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { ProjectDataResult } from "@interfaces/interfaces";
import IncludeType from "@model/include-type.model";

@Component({
  selector: "app-includes",
  templateUrl: "./includes.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [FormsModule, MatList, MatListItem, MatRadioGroup, MatRadioButton],
})
export default class IncludesComponent {
  includeTypes: IncludeType[] = [];

  load(data: ProjectDataResult): void {
    for (const i in this.includeTypes) {
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
