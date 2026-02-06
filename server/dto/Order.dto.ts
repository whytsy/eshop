import { type OrderStatusType, type OrderInstance } from "../database/models/Order.model"
import { OrderItemDto } from "./OrderItem.dto"

export class OrderDto {
    id: number
    status: OrderStatusType
    deliveryAddress: string
    phone: string
    order_items?: OrderItemDto[]

    constructor(order: OrderInstance) {
        this.id = order.id
        this.status = order.status
        this.deliveryAddress = order.deliveryAddress
        this.phone = order.phone

        if (order.order_items) {
            this.order_items = order.order_items.map(order_item =>
                new OrderItemDto(order_item)
            )
        }
    }
}