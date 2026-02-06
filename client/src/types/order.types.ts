import type { DeviceDto } from "./device.types"

enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}

interface OrderDto {
    id: number
    status: OrderStatus
    deliveryAddress: string
    phone: string
    order_items?: OrderItemDto[]
}

interface OrderItemDto {
    id: number
    deviceId: number
    quantity: number
    price: number
    device: DeviceDto
}

interface OrderStats {
    orderSummary: OrderSummary,
    dailyStats: DailyStats[]
}

interface OrderSummary {
    totalOrders: number
    totalSum: number
    totalAvg: number
}

interface DailyStats {
    date: Date
    ordersCount: number
    totalSum: number
}

export type {
    OrderStatus,
    OrderDto,
    OrderItemDto,
    OrderStats,
    DailyStats
}