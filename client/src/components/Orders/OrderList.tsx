import { useEffect, useState } from "react"
import { handlerUncaughtError, isErrorResponse } from "../../http/errors/ErrorHandler"
import { getOrders } from "../../http/orderApi"
import type { OrderDto } from "../../types/order.types"
import { toast } from "react-toastify"
import { Card, Col, Container, Row, Spinner, Table } from "react-bootstrap"
import OrderItem from "./OrderItem"

const OrderList = () => {

    const [orders, setOrders] = useState<OrderDto[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const orders = await getOrders()

                if (isErrorResponse(orders)) {
                    return toast.error("Error while getting order list")
                }
                
                setOrders(orders)
                
            } catch (error) {
                handlerUncaughtError(error)
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

  return (
    <>
        {loading ?
            <Spinner animation="grow" /> : 

            <Container className="w-full">
                <Row className="mb-3">
                    <Col>
                        <h3>Order history</h3>
                    </Col>
                </Row>
                {
                    orders?.length === 0 ?
                        <div>No orders found</div> :
                        <Card>
                            {orders!.map(order => 
                                <div key={order.id}>
                                    <Card.Header>
                                        <Card.Title>Order ID: {order.id}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Header className="mb-3">
                                            <Row>
                                                <Col>
                                                    <Card.Title>Deliviry address:</Card.Title>
                                                    {order.deliveryAddress}
                                                </Col>
                                                <Col>
                                                    <Card.Title>Phone:</Card.Title>
                                                    {order.phone}
                                                </Col>
                                                <Col>
                                                    <Card.Title>Order status:</Card.Title>
                                                    {order.status}
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        
                                        <>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Device ID:</th>
                                                        <th>Device Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        order.order_items?.map(order_item =>
                                                                <OrderItem key={order_item.id} orderItem={order_item} />
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </>
                                    </Card.Body>
                                </div>
                            )}
                        </Card>
                }
            </Container>

        }
    </>
  )
}

export default OrderList