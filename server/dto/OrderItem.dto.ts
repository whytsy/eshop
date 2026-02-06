import { type OrderItemInstance } from "../database/models/OrderItem.model"
import { DeviceDto } from "./Device.dto"

export class OrderItemDto {
    id: number
    deviceId: number
    quantity: number
    price: number
    device?: DeviceDto

    constructor(orderItem: OrderItemInstance) {
        this.id = orderItem.id
        this.quantity = orderItem.quantity
        this.price = orderItem.price
        this.deviceId = orderItem.deviceId
        if (orderItem.device) {
            this.device = new DeviceDto(orderItem.device)
        }
    }
}