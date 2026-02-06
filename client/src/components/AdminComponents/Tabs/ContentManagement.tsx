import AddBrand from '../Content/Add/AddBrand'
import AddDevice from '../Content/Add/AddDevice'
import AddType from '../Content/Add/AddType'
import ChangeBrand from '../Content/Change/ChangeBrand'
import ChangeDevice from '../Content/Change/ChangeDevice'
import ChangeType from '../Content/Change/ChangeType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/StoreContext'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { hasRequiredRole, Roles } from '../../../store/UserStore'

const ContentManagement = observer(() => {

    const {user} = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || !user.isAuth || !user.user || !hasRequiredRole(Roles.Moderator, user.user.role)) {
            navigate("/")
        }
    }, [])

    const [showTypeModal, setShowTypeModal] = useState(false)
    const [showBrandModal, setShowBrandModal] = useState(false)
    const [showDeviceModal, setShowDeviceModal] = useState(false)

    const [showTypeChangeModal, setShowTypeChangeModal] = useState(false)
    const [showBrandChangeModal, setShowBrandChangeModal] = useState(false)
    const [showDeviceChangeModal, setShowDeviceChangeModal] = useState(false)

    return (
        <>
            <div className="flex flex-col gap-3 mt-4 max-w-8/10 rounded-xl p-4 border-1 border-[var(--bs-border-color)]">
            <Button
            variant="secondary"
            onClick={() => setShowTypeModal(true)}
            
            >Add Type</Button>
            <Button
            variant="secondary"
            onClick={() => setShowBrandModal(true)}

            >Add Brand</Button>
            <Button
            variant="secondary"
            onClick={() => setShowDeviceModal(true)}
            className=""
            >Add Device</Button>

            <AddType show={showTypeModal} onClose={() => setShowTypeModal(false)} />
            <AddBrand show={showBrandModal} onClose={() => setShowBrandModal(false)} />
            <AddDevice show={showDeviceModal} onClose={() => setShowDeviceModal(false)} />
        </div>

        <div className="flex flex-col gap-3 mt-4 max-w-8/10 rounded-xl p-4 border-1 border-[var(--bs-border-color)]">
            <Button
            variant="secondary"
            onClick={() => setShowTypeChangeModal(true)}
            
            >Change Type</Button>
            <Button
            variant="secondary"
            onClick={() => setShowBrandChangeModal(true)}

            >Change Brand</Button>
            <Button
            variant="secondary"
            onClick={() => setShowDeviceChangeModal(true)}
            className=""
            >Change Device</Button>

            <ChangeType show={showTypeChangeModal} onClose={() => setShowTypeChangeModal(false)} />
            <ChangeBrand show={showBrandChangeModal} onClose={() => setShowBrandChangeModal(false)} />
            <ChangeDevice show={showDeviceChangeModal} onClose={() => setShowDeviceChangeModal(false)} />
        </div>
        </>
    )
})

export default ContentManagement