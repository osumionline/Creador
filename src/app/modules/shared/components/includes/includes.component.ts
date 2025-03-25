import { Component, model, ModelSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatList, MatListItem } from "@angular/material/list";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import IncludeType from "@model/include-type.model";

@Component({
  selector: "app-includes",
  templateUrl: "./includes.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [FormsModule, MatList, MatListItem, MatRadioGroup, MatRadioButton],
})
export default class IncludesComponent {
  includeTypes: ModelSignal<IncludeType[]> = model.required<IncludeType[]>();

  removeSelectedInclude(ev: MouseEvent, inc: IncludeType): void {
    ev.preventDefault();
    delete inc.selected;
  }
}
