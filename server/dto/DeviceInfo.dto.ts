import { type DeviceInfoInstance } from "../database/models/DeviceInfo.model"

export class DeviceInfoDto {
    id: number
    title: string
    description: string
    
    constructor(model: DeviceInfoInstance) {
        this.id = model.id
        this.title = model.title
        this.description = model.description
    }
}