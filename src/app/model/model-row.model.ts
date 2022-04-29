import { ModelRowInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class ModelRow {
	constructor(
		public id: number = null,
		public name: string = null,
		public type: number = null,
		public size: number = null,
		public autoIncrement: boolean = false,
		public nullable: boolean = true,
		public defaultValue: string = null,
		public ref: string = null,
		public comment: string = null,
		public order: number = null
	) {}

	fromInterface(mr: ModelRowInterface): ModelRow {
		this.id: number;
		this.name: string;
		this.type: number;
		this.size: number;
		this.autoIncrement: boolean;
		this.nullable: boolean;
		this.defaultValue: string;
		this.ref: string;
		this.comment: string;
		this.order: number;

		return this;
	}
}