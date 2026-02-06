import type { OrderItemDto } from '../../types/order.types'

interface OrderItemInterface {
    orderItem: OrderItemDto
}

const OrderItem = ({orderItem}: OrderItemInterface) => {
  return (
    <tr>
        <td>{orderItem.device.id}</td>
        <td>{orderItem.device.name}</td>
        <td>{orderItem.price}</td>
        <td>{orderItem.quantity}</td>
        <td>{orderItem.price * orderItem.quantity}</td>
    </tr>
  )
}

export default OrderItem