import { Button, CloseButton, FloatingLabel, Form, InputGroup, Modal, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { createDevice } from '../../../../http/deviceAPI'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useStore } from '../../../../store/StoreContext'
import { observer } from 'mobx-react-lite'
import { getAllTypes } from '../../../../http/typeAPI'
import { getAllBrands } from '../../../../http/brandAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface AddDeviceProps {
    show: boolean,
    onClose: () => void
}

export interface InfoAttrs {
    title: string,
    description: string,
    temp_id: number,
    id?: number
}

const AddDevice = observer(({show, onClose}: AddDeviceProps) => {

    const {device} = useStore()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantityInStock, setQuantity] = useState(0)
    const [files, setFiles] = useState<FileList>()
    const [info, setInfo] = useState<InfoAttrs[]>([])
    const [typeId, setTypeId] = useState(0)
    const [brandId, setBrandId] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllTypes().then(data => {
            if (isErrorResponse(data)) {
                toast.error("Error while getting types")
            } else {
                device.setTypes(data)
            }
        })
        getAllBrands().then(data => {
            if (isErrorResponse(data)) {
                toast.error("Error while getting brands")
            } else {
                device.setBrands(data)
            }

            setLoading(false)
        })
    }, [])

    const addDevice = async () => {
        if (!files) {
            toast.error("Upload files first")
        } else {
            try {
                const response = await createDevice({name, price, quantityInStock, typeId, brandId, info, images: files})
                
                if (isErrorResponse(response)) {
                    response.errors.forEach(error => toast.error(error.msg))
                } else {
                    device.brands.push(response)
                    toast.success("Successfully added new device: " + name)
                }
            } catch (error) {
                handlerUncaughtError(error)
            }
        }
    }

    const setMultipleFiles = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        
        if (files != null) {
            setFiles(files)
        }
    }

    const addInfo = async () => {
        setInfo([...info, {title: "", description: "", temp_id: Date.now()}])
    }

    const changeInfo = async (key: string, value: string, id: number) => {
        setInfo(info.map(info => info.temp_id === id ? {...info, [key]: value} : info))
    }

    const removeInfo = (id: number) => {
        setInfo(info.filter(info => info.temp_id !== id))
    }

    const renderBrands = () => {
        try {
            return (
                device.brands.map(brand => {
                    return (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    )
                })
            )
        } catch (error) {
            handlerUncaughtError(error)
        }
    }


  return (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add Device Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {loading ? <Spinner animation='grow'/> :
            <Form
                className='space-y-4'
            >
                <Form.Group>
                    <FloatingLabel
                        label="Select Type"
                    >
                        <Form.Select
                            onChange={e => setTypeId(parseInt(e.target.value))}
                        >
                            <option>Open to select type</option>
                            {device.types.map(type => {
                                return (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                )
                            })}
                        </Form.Select>

                    </FloatingLabel>
                    
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        label="Select Brand"
                    >
                        <Form.Select
                            onChange={e => setBrandId(parseInt(e.target.value))}
                        >
                            <option>Open to select brand</option>
                            {renderBrands()}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        label="Name"
                    >
                        <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        label="Price"
                    >
                        <Form.Control
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        label="Quantity"
                    >
                        <Form.Control
                            type='number'
                            value={quantityInStock}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='text-center font-bold'>Add device images</Form.Label>
                    <Form.Control
                        type='file'
                        multiple
                        onChange={e => setMultipleFiles(e)}
                    />
                </Form.Group>
                <Form.Group className='border-1 dark:border-[var(--bs-border-color)] rounded-xl p-2 flex flex-col'>
                    <Form.Label className='text-center font-bold'>Write device parameters</Form.Label>
                    <Button
                        className='max-w-8/10 mb-2 align-self-center'
                        variant='secondary'
                        onClick={addInfo}
                    >Add new parameter</Button>
                    {
                        info.map(info => {
                            return (
                                <InputGroup className='mb-2'>
                                    <CloseButton onClick={() => removeInfo(info.temp_id)} />
                                    <FloatingLabel
                                        label="Title"
                                    >
                                        <Form.Control
                                            value={info.title}
                                            onChange={e => changeInfo("title", e.target.value, info.temp_id)}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        label="Description"
                                    >
                                        <Form.Control
                                            value={info.description}
                                            onChange={e => changeInfo("description", e.target.value, info.temp_id)}
                                        />
                                    </FloatingLabel>
                                </InputGroup>
                            )
                        })
                    }
                </Form.Group>
                <Button variant='success' onClick={addDevice}>Add</Button>
            </Form>
            }
        </Modal.Body>
    </Modal>
  )
})

export default AddDevice