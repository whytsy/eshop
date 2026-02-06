import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreContext'

const LimitBar = observer(() => {

    const {device} = useStore()

    const limits = [6, 10, 20, 50]

    const changeLimit = (limit: string) => {
        try {
            device.setLimit(parseInt(limit))
        } catch (error) {}
    }

  return (
    <div
        className='flex align-items-center gap-3 text-xl'
    >
        <span>Items per page:</span>
        <select
            className="rounded-lg px-3 py-2 max-h-12 align-self-center bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
            onChange={e => changeLimit(e.target.value)}
            value={device.limit}
        >
            {limits.map(limit => {
                return (
                    <option
                        key={limit}
                        value={limit}
                        className="bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                    >
                        {limit}
                    </option>
                )
            })}
        </select>
    </div>
  )
})

export default LimitBar