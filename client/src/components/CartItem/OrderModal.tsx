import { Button, FloatingLabel, Form, FormGroup, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { isErrorResponse } from '../../http/errors/ErrorHandler'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { createOrder } from '../../http/orderApi'
import { useStore } from '../../store/StoreContext'

interface OrderModalAttrs {
    show: boolean,
    onHide: () => void
}

const OrderModal = observer(({show, onHide}: OrderModalAttrs) => {

    const {cart} = useStore()
    
    const [orderDetails, setOrderDetails] = useState({deliveryAddress: "", phone: ""})

    const orderItems = async () => {
        const russianPhoneRegex = /^(8|\+7)(\s|\(|-)?(\d{3})(\s|\)|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/gm
    
        if (orderDetails.deliveryAddress.trim().length === 0) {
          return toast.error("Enter delivery address")
        }
    
        if (!russianPhoneRegex.test(orderDetails.phone)) {
          return toast.error("Enter correct phone number")
        }
    
        const response = await createOrder(orderDetails.deliveryAddress, orderDetails.phone)
    
        if (isErrorResponse(response)) {
          response.errors.forEach(error => toast.error(error.msg))
        } else {
          toast.success("Successfully created order!")
        }

        onHide()
        cart.clearCart()
    }

  return (
    <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <FormGroup className="space-y-3">
                <FloatingLabel label="Delivery Address">
                <Form.Control
                    value={orderDetails.deliveryAddress}
                    onChange={(e) => setOrderDetails({...orderDetails, deliveryAddress: e.target.value})}
                />
                </FloatingLabel>
                <FloatingLabel label="Phone">
                <Form.Control
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                />
                </FloatingLabel>

                <Button
                    onClick={() => {
                        orderItems()
                        onHide()
                    }}
                variant="success"
                >Order</Button>
            </FormGroup>
            </Form>
        </Modal.Body>
    </Modal>
  )
})

export default OrderModal