import { type BrandInstance } from "../database/models/Brand.model";

export class BrandDto {
    id: number;
    name: string;

    constructor(model: BrandInstance) {
        this.id = model.id
        this.name = model.name
    }
}