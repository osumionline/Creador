import { ProjectInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Project {
  constructor(
    public id: number | null = null,
    public name: string | null = 'Nuevo proyecto',
    public slug: string | null = 'nuevo-proyecto',
    public description: string | null = '',
    public updatedAt: string | null = '',
    public lastCompilationDate: string | null = '',
  ) {}

  fromInterface(p: ProjectInterface): Project {
    this.id = p.id;
    this.name = urldecode(p.name);
    this.slug = p.slug;
    this.description = urldecode(p.description);
    this.updatedAt = p.updatedAt;
    this.lastCompilationDate = p.lastCompilationDate;

    return this;
  }

  toInterface(): ProjectInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      slug: this.slug,
      description: urlencode(this.description),
      updatedAt: this.updatedAt,
      lastCompilationDate: this.lastCompilationDate,
    };
  }
}
