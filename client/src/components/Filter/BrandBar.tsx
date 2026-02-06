import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreContext'
import { ListGroup } from 'react-bootstrap'

const BrandBar = observer(() => {

    const {device} = useStore()

  return (
    <ListGroup
        className='rounded-lg text-xl space-y-1'
    >
        {device.brands.map(brand => {
            if (device.selectedBrand && device.selectedBrand.id == brand.id) {
                return (
                    <ListGroup.Item
                        key={brand.id}
                        onClick={() => device.setSelectedBrand(null)}
                        bsPrefix="cursor-pointer rounded-lg px-3 py-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 transition duration-300 dark:hover:bg-zinc-500 border-1 border-zinc-400 dark:border-zinc-400"
                    >
                        {brand.name}
                    </ListGroup.Item>
                )
            } else {
                return (
                    <ListGroup.Item
                        key={brand.id}
                        onClick={() => device.setSelectedBrand(brand)}
                        bsPrefix="cursor-pointer rounded-lg px-3 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500 transition duration-300"
                    >
                        {brand.name}
                    </ListGroup.Item>
                )
            }
        })}
    </ListGroup>
  )
})

export default BrandBar