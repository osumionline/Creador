import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, inject, model, ModelSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatTooltip } from "@angular/material/tooltip";
import { ModelRowTypeInterface } from "@interfaces/interfaces";
import ModelRow from "@model/model-row.model";
import Model from "@model/model.model";
import ClassMapperService from "@services/class-mapper.service";

@Component({
  selector: "app-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    MatIconButton,
    MatButton,
    MatIcon,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatTooltip,
  ],
})
export default class ModelComponent {
  private cms: ClassMapperService = inject(ClassMapperService);

  modelRowTypes: ModelRowTypeInterface[] = [
    { id: 1, name: "PK" },
    { id: 10, name: "PK Str" },
    { id: 2, name: "Created" },
    { id: 3, name: "Updated" },
    { id: 4, name: "Númerico" },
    { id: 5, name: "Texto" },
    { id: 6, name: "Fecha" },
    { id: 7, name: "Booleano" },
    { id: 8, name: "Texto largo" },
    { id: 9, name: "Float" },
  ];

  projectModel: ModelSignal<Model[]> = model.required<Model[]>();

  addModel(): void {
    this.projectModel.update((value: Model[]): Model[] => {
      value.push(new Model());
      return value;
    });
  }

  addModelRow(ind: number, model: Model): void {
    this.projectModel.update((value: Model[]): Model[] => {
      value[ind].rows.push(new ModelRow());
      return value;
    });
    model.open = true;
  }

  deleteModel(ind: number): void {
    this.projectModel.update((value: Model[]): Model[] => {
      value.splice(ind, 1);
      return value;
    });
  }

  deleteModelRow(ind: number, field: number): void {
    this.projectModel.update((value: Model[]): Model[] => {
      value[ind].rows.splice(field, 1);
      return value;
    });
  }

  openModel(model: Model): void {
    model.open = !model.open;
  }

  moveRow(ind_model: number, ind: number, sent: string): void {
    let new_order: number;
    if (sent == "down") {
      if (ind < this.projectModel()[ind_model].rows.length - 1) {
        new_order = ind + 1;
      } else {
        return;
      }
    } else {
      if (ind > 0) {
        new_order = ind - 1;
      } else {
        return;
      }
    }
    const aux: ModelRow = this.projectModel()[ind_model].rows[ind];
    this.projectModel.update((value: Model[]): Model[] => {
      value[ind_model].rows[ind] = value[ind_model].rows[new_order];
      value[ind_model].rows[new_order] = aux;
      return value;
    });
  }
}
