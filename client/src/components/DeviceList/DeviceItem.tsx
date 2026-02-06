import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart } from '../../http/userAPI'
import { Card } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreContext'
import type { DeviceDto } from '../../types/device.types'
import { hostURL } from '../../http/helper'
import { isErrorResponse } from '../../http/errors/ErrorHandler'
import './DeviceItem.css'

interface DeviceItemProps {
    deviceItem: DeviceDto
}

const DeviceItem = observer(({deviceItem}: DeviceItemProps) => {

    const {user} = useStore()

    const navigate = useNavigate()

    const click = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
    
        if (!user.isAuth) {
          toast.info("Need to login first")
          return navigate("/login")
        }

        if (deviceItem.quantityInStock < 1) {
            return toast.error("Not enough items in stock")
        }
        
        const data = await addToCart(deviceItem.id)

        if (data && isErrorResponse(data)) {
            data.errors.forEach(error => toast.error(error.msg))
        } else {
            toast.success("Item added successfully")
        }
      }

    return (
        <Card className='h-100'>
            <div key={deviceItem.id} className='relative flex justify-center'>
                <div className='w-40 h-40 align-self-center'>
                    <img
                        onClick={() => navigate("/device/" + deviceItem.id)}
                        src={hostURL + deviceItem.images.find(image => image.isMain)?.imageUrl}
                        className='w-full h-full object-fit-contain rounded-sm'
                    />
                </div>
                
                <div className='m-1 absolute right-0 top-0 bg-zinc-100 dark:bg-zinc-700 border-1 border-zinc-400 dark:border-zinc-800 px-2.5 rounded-3xl font-bold'>{deviceItem.type.name}</div>
            </div>
            <Card.Body onClick={() => navigate("/device/" + deviceItem.id)} className='flex flex-col'>
                <Card.Title>{deviceItem.name}</Card.Title>
                <Card.Text className='flex justify-between'>
                    <span className="">in Stock: {deviceItem.quantityInStock}</span>
                    <span className="font-bold text-xl">Price: {deviceItem.price}</span>
                </Card.Text>
                <div className='w-fit px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition duration-200 border-1 border-zinc-300 dark:border-zinc-800 rounded-3xl font-bold mt-auto mx-auto'>
                    <button
                        onClick={e => click(e)}
                    >Add to cart</button>
                </div>
            </Card.Body>
        </Card>
    )
})

export default DeviceItem