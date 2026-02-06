import { api } from "."
import type { OrderDto, OrderStats } from "../types/order.types"
import { handleApiError } from "./errors/ErrorHandler"

export const getOrders = async () => {
    try {
        const {data} = await api.get<OrderDto[]>("/order")

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const createOrder = async (deliveryAddress: string, phone: string) => {
    try {
        const {data} = await api.post<OrderDto>("/order", {deliveryAddress, phone})

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const getStats = async () => {
    try {
        const {data} = await api.get<OrderStats>("/admin/order/stats")

        return data
    } catch (error) {
        return handleApiError(error)
    }
}