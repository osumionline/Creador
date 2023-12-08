import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { ProjectDataResult } from "src/app/interfaces/interfaces";
import { IncludeType } from "src/app/model/include-type.model";

@Component({
  standalone: true,
  selector: "app-includes",
  templateUrl: "./includes.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [CommonModule, FormsModule, MatListModule, MatRadioModule],
})
export class IncludesComponent {
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
