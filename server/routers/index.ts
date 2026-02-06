import express from "express"
const router = express.Router()
import brandRouter from './brand'
import deviceRouter from './device'
import typeRouter from './type'
import userRouter from './user'
import adminRouter from './admin'
import orderRouter from './order'

router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/order', orderRouter)

export default router