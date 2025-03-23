import { Injectable } from "@angular/core";
import {
  IncludeTypeInterface,
  ModelInterface,
  ProjectInterface,
  UserInterface,
} from "@interfaces/interfaces";
import IncludeType from "@model/include-type.model";
import Model from "@model/model.model";
import Project from "@model/project.model";
import User from "@model/user.model";

@Injectable({
  providedIn: "root",
})
export default class ClassMapperService {
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
