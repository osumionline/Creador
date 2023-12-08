import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {
  ModelRowTypeInterface,
  ProjectDataResult,
} from "src/app/interfaces/interfaces";
import { ModelRow } from "src/app/model/model-row.model";
import { Model } from "src/app/model/model.model";
import { ClassMapperService } from "src/app/services/class-mapper.service";

@Component({
  standalone: true,
  selector: "app-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./../../../pages/project/project.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class ModelComponent {
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

  projectModel: Model[] = [];

  constructor(private cms: ClassMapperService) {}

  load(data: ProjectDataResult): void {
    this.projectModel = this.cms.getModels(data.models);
  }

  getModel(): Model[] {
    return this.projectModel;
  }

  addModel(): void {
    this.projectModel.push(new Model());
  }

  addModelRow(ind: number, model: Model): void {
    this.projectModel[ind].rows.push(new ModelRow());
    model.open = true;
  }

  deleteModel(ind: number): void {
    this.projectModel.splice(ind, 1);
  }

  deleteModelRow(ind: number, field: number): void {
    this.projectModel[ind].rows.splice(field, 1);
  }

  openModel(model: Model): void {
    model.open = !model.open;
  }

  moveRow(ind_model: number, ind: number, sent: string): void {
    let new_order: number;
    if (sent == "down") {
      if (ind < this.projectModel[ind_model].rows.length - 1) {
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
    const aux: ModelRow = this.projectModel[ind_model].rows[ind];
    this.projectModel[ind_model].rows[ind] =
      this.projectModel[ind_model].rows[new_order];
    this.projectModel[ind_model].rows[new_order] = aux;
  }
}
