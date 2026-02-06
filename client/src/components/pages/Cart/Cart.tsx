import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCart } from "../../../http/userAPI"
import { observer } from "mobx-react-lite"
import { toast } from "react-toastify"
import { useStore } from "../../../store/StoreContext"
import { handlerUncaughtError, isErrorResponse } from "../../../http/errors/ErrorHandler"
import CartList from "../../CartItem/CartList"

const Cart = observer(() => {
  const {cart, user} = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAuth) {
      toast.warn("Need to login first")
      navigate('/login')
    } else {
      getCart().then(data => {
        if (isErrorResponse(data)) {
          toast.error("Error while getting cart")
        } else {
          cart.setDevices(data.data)
        }
      }).catch(e => handlerUncaughtError(e))
    }
  }, [])

  return (
    <CartList />
  )
})

export default Cart