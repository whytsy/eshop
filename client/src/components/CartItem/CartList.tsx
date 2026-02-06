import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useStore } from '../../store/StoreContext'
import OrderModal from './OrderModal'
import CartItem from './CartItem'

const CartList = observer(() => {
  const {cart} = useStore()
  const [orderModalShow, setOrderModalShow] = useState(false)
  let total = 0

  return (
    <Container>
      <Row>
      {cart.devices.map(deviceItem => {
        total += (deviceItem.price * deviceItem.amount)
        return (
          <CartItem key={deviceItem.id} deviceItem={deviceItem} />
        )
      })}
      </Row>
      <Row className="font-bold text-xl">
        {cart.devices.length == 0 ?
          <span className="text-center mt-5">Your cart is empty</span> : 
          <div className="flex justify-content-around">
            Total: {total}
            <Button
              className="px-3 py-2"
              variant="success"
              onClick={() => setOrderModalShow(true)}
            >Order</Button>
          </div>
          
        }
      </Row>
      <OrderModal show={orderModalShow} onHide={() => setOrderModalShow(false)} />
    </Container>
  )
})

export default CartList