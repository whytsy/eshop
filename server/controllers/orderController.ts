import type { Request, Response } from "express";
import orderService from "../service/orderService";

class OrderController {
    async createOrder(req: Request, res: Response) {
        const {id} = req.user!
        const {deliveryAddress, phone} = req.body

        const order = await orderService.createOrder(id, deliveryAddress, phone)

        return res.status(201).json(order)
    }

    async getOrderList(req: Request, res: Response) {
        const {id} = req.user!

        const orders = await orderService.getOrderList(id)

        return res.status(200).json(orders)
    }

    async getStats(req: Request, res: Response) {
        const stats = await orderService.getStats()

        return res.status(200).json(stats)
    }
}

export default new OrderController()