import { Injectable } from "@angular/core";
import {
  IncludeTypeInterface,
  ModelInterface,
  ProjectInterface,
  UserInterface,
} from "src/app/interfaces/interfaces";
import { IncludeType } from "src/app/model/include-type.model";
import { Model } from "src/app/model/model.model";
import { Project } from "src/app/model/project.model";
import { User } from "src/app/model/user.model";

@Injectable({
  providedIn: "root",
})
export class ClassMapperService {
  getUser(u: UserInterface): User {
    return new User().fromInterface(u);
  }

  getProjects(ps: ProjectInterface[]): Project[] {
    return ps.map((p: ProjectInterface): Project => {
      return this.getProject(p);
    });
  }

  getProject(p: ProjectInterface): Project {
    return new Project().fromInterface(p);
  }

  getModels(ms: ModelInterface[]): Model[] {
    return ms.map((m: ModelInterface): Model => {
      return this.getModel(m);
    });
  }

  getModel(m: ModelInterface): Model {
    return new Model().fromInterface(m);
  }

  getIncludeTypes(its: IncludeTypeInterface[]): IncludeType[] {
    return its.map((it: IncludeTypeInterface): IncludeType => {
      return this.getIncludeType(it);
    });
  }

  getIncludeType(it: IncludeTypeInterface): IncludeType {
    return new IncludeType().fromInterface(it);
  }
}
