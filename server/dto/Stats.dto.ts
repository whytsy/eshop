interface OrderSummary {
    total_orders: string
    total_sum: string
    total_avg: string
}

export class OrderSummaryDto {
    totalOrders: number
    totalSum: number
    totalAvg: number

    constructor(orderSummary: OrderSummary) {
        this.totalOrders = parseInt(orderSummary.total_orders)
        this.totalSum = parseFloat(orderSummary.total_sum)
        this.totalAvg = parseFloat(orderSummary.total_avg)
    }
}

interface DailyStats {
    date: string
    orders_count: string
    total_sum: string
}

export class DailyStatsDto {
    date: Date
    ordersCount: number
    totalSum: number

    constructor(dailyStats: DailyStats) {
        this.date = new Date(dailyStats.date)
        this.ordersCount = parseInt(dailyStats.orders_count)
        this.totalSum = parseFloat(dailyStats.total_sum)
    }
}