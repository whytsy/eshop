import { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useStore } from '../../../../store/StoreContext'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { changeBrand, deleteBrand, getAllBrands } from '../../../../http/brandAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface ChangeBrandProps {
    show: boolean,
    onClose: () => void
}

const ChangeBrand = observer(({show, onClose}: ChangeBrandProps) => {
    const [name, setName] = useState('')
    const {device} = useStore()
    const [brandId, setBrandId] = useState<string>()

    useEffect(() => {
        getAllBrands().then(data => {
            if (isErrorResponse(data)) {
                toast.error("Error while getting brands")
            } else {
                device.setBrands(data)
            }
        }).catch(e => handlerUncaughtError(e))
    }, [])

    const changeBrandName = async () => {
        if (!brandId || name.trim().length === 0) {
            toast.error("Brand name shouldn't be empty")
        } else {
            try {
                const response = await changeBrand(parseInt(brandId), name)
                device.brands.push(response)
                toast.success("Successfully added brand: " + name)
                onClose()
            } catch (error) {
                handlerUncaughtError(error)
            }
        }
    }

    const removeBrand = async () => {
        if (!brandId) {
            toast.error("Select brand first")
        } else {
            await deleteBrand(parseInt(brandId))
            device.deleteBrand(parseInt(brandId))
            toast.success("Successfully deleted brand: " + name)
            onClose()
        }
    }

    const renderBrands = () => {
        try {
            return (
                device.brands.map(brand => {
                        return (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        )
                    }
                )
            )
        } catch (error) {
            handlerUncaughtError(error)
        }
    }

  return (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Change Brand Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    {
                        device.brands.length === 0 ?
                            <div>No brands tp change</div> :
                            
                            <FloatingLabel label="Select brand">
                                <Form.Select
                                    onChange={e => setBrandId(e.target.value)}
                                >
                                    <option>Open to select brand</option>
                                    {renderBrands()}
                                </Form.Select>
                            </FloatingLabel>
                    }
                    {brandId ? 
                        <>
                            <FloatingLabel
                                label="Brand name"
                                className='mb-3'
                            >
                                <Form.Control
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Enter name'
                                />
                            </FloatingLabel>
                            <Button variant='success' onClick={changeBrandName}>Change</Button>
                            <Button variant='danger' onClick={removeBrand}>Delete</Button>
                        </>
                    : <></>}
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
  )
})

export default ChangeBrand