import { Button, ButtonGroup, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { hostURL } from '../../http/helper'
import CrossIcon from '../NavBar/CrossIcon'
import type { DeviceCartDto } from '../../types/device.types'
import { useNavigate } from 'react-router-dom'
import { changeCartItemAmount, deleteItemFromCart } from '../../http/userAPI'
import { isErrorResponse } from '../../http/errors/ErrorHandler'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreContext'

interface CartItemAttrs {
    deviceItem: DeviceCartDto
}

const CartItem = observer(({deviceItem}: CartItemAttrs) => {

    const {cart} = useStore()

    const navigate = useNavigate()

    const increaseAmount = async (deviceId: number, amount: number) => {
        const response = await changeCartItemAmount(deviceId, amount)

        if (response && isErrorResponse(response)) {
        response.errors.forEach(error => toast.error(error.msg))
        }
    }

    const decreaseAmount = async (deviceId: number, amount: number) => {
        const response = await changeCartItemAmount(deviceId, amount)

        if (response && isErrorResponse(response)) {
        response.errors.forEach(error => toast.error(error.msg))
        }
    }

    const deleteItem = async (deviceId: number) => {
        const response = await deleteItemFromCart(deviceId)

        if (response && isErrorResponse(response)) {
        response.errors.forEach(error => toast.error(error.msg))
        } else {
        cart.deleteDevice(deviceId)
        toast.info("Deleted device from cart")
        }
    }

    return (
        <Container className="p-4 rounded bg-[var(--bs-border-color)] mb-3">
            <Row>
                <Col md={3}>
                    <Image
                        className="cursor-pointer w-40 h-40 object-fit-contain"
                        src={hostURL + deviceItem.images[0].imageUrl}
                        onClick={() => navigate("/device/" + deviceItem.id)}
                        rounded
                    />
                </Col>
                <Col md={4} className="flex flex-col gap-2">
                <span className="font-bold my-2 text-3xl">
                    {deviceItem.type.name} {deviceItem.name}
                </span>
                <span className="font-bold text-xl">
                    Price: {deviceItem.price} &times; {deviceItem.amount} = {deviceItem.price * deviceItem.amount}
                </span>
                <InputGroup>
                    <InputGroup.Text id={String(deviceItem.id)}>Amount:</InputGroup.Text>
                    <Form.Control
                        value={deviceItem.amount}
                    />
                </InputGroup>
                <ButtonGroup>
                    <Button
                    disabled={deviceItem.amount <= 1}
                    variant="danger"
                    onClick={
                        () => {
                        if (deviceItem.amount <= 1) {
                            deleteItem(deviceItem.id)
                        } else {
                            deviceItem.amount -= 1
                            decreaseAmount(deviceItem.id, deviceItem.amount)
                        }
                    }}
                    >-</Button>
                    <Button
                    disabled={deviceItem.amount >= deviceItem.quantityInStock}
                    variant="success"
                    onClick={
                        () => {
                        if (deviceItem.amount < deviceItem.quantityInStock) {
                            deviceItem.amount += 1
                            increaseAmount(deviceItem.id, deviceItem.amount)
                        }
                    }}
                    >+</Button>
                </ButtonGroup>
                </Col>
                <Col className="flex justify-end">
                    <CrossIcon onClick={() => deleteItem(deviceItem.id)} />
                </Col>
            </Row>
        </Container>
    )
})

export default CartItem