import { type TypeInstance } from "../database/models/Type.model";

export class TypeDto {
    id: number;
    name: string;

    constructor(model: TypeInstance) {
        this.id = model.id
        this.name = model.name
    }
}