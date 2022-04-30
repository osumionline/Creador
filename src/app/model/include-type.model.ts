import { IncludeTypeInterface } from 'src/app/interfaces/interfaces';
import { IncludeVersion } from 'src/app/model/include-version.model';

export class IncludeType {
	selected: boolean = false;

	constructor(
		public  id: number = null,
		public versions: IncludeVersion[] = []
	) {}

	fromInterface(it: IncludeTypeInterface): IncludeType {
		this.id = it.id;
		this.versions = it.versions.map((item) => { return new IncludeVersion().fromInterface(item) });

		return this;
	}

	toInterface(): IncludeTypeInterface {
		return {
			id: this.id,
			versions: this.versions.map(item => item.toInterface())
		};
	}
}
