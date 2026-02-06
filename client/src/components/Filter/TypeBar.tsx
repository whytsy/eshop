import { observer } from 'mobx-react-lite';
import { ListGroup } from "react-bootstrap";
import { useStore } from "../../store/StoreContext";

const TypeBar = observer(() => {
    const {device} = useStore()
    return(
        <ListGroup
            className="rounded-lg text-xl space-y-1"
        >
            {device.types.map(type => {
                if (device.selectedType && device.selectedType.id == type.id) {
                    return (
                        <ListGroup.Item
                            key={type.id}
                            onClick={() => device.setSelectedType(null)}
                            bsPrefix="cursor-pointer rounded-lg px-3 py-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500 transition duration-300 border-1 border-zinc-400 dark:border-zinc-400"
                        >
                            {type.name}
                        </ListGroup.Item>
                    )
                } else {
                    return (
                        <ListGroup.Item
                            key={type.id}
                            onClick={() => device.setSelectedType(type)}
                            bsPrefix="cursor-pointer rounded-lg px-3 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500 transition duration-300"
                        >
                            {type.name}
                        </ListGroup.Item>
                    )
                }
            })}
        </ListGroup>
    )
})

export default TypeBar