import { type DeviceImageInstance } from "../database/models/DeviceImage.model"

export class DeviceImageDto {
    id: number
    imageUrl: string
    isMain: boolean
    orderIndex: number
    
    constructor(model: DeviceImageInstance) {
        this.id = model.id
        this.imageUrl = model.imageUrl
        this.isMain = model.isMain
        this.orderIndex = model.orderIndex
    }
}