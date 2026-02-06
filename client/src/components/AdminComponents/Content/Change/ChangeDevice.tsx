import { useEffect, useState, type ChangeEvent } from 'react'
import { Button, CloseButton, FloatingLabel, Form, Image, InputGroup, Modal, Spinner } from 'react-bootstrap'
import { useStore } from '../../../../store/StoreContext'
import { toast } from 'react-toastify'
import { deleteDevice, getAllDevicesAdmin, updateDevice } from '../../../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import type { InfoAttrs } from '../Add/AddDevice'
import { hostURL } from '../../../../http/helper'
import CrossIcon from '../../../NavBar/CrossIcon'
import { getAllTypes } from '../../../../http/typeAPI'
import { getAllBrands } from '../../../../http/brandAPI'
import type { DeviceDto, DeviceImageDto } from '../../../../types/device.types'
import { isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface ChangeDeviceProps {
    show: boolean,
    onClose: () => void
}

const ChangeDevice = observer(({show, onClose}: ChangeDeviceProps) => {
    const {device} = useStore()

    const [deviceId, setDeviceId] = useState<number>()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantityInStock, setQuantity] = useState(0)
    const [newFiles, setNewFiles] = useState<FileList>()
    const [defaultFiles, setDefaultFiles] = useState<DeviceImageDto[]>()
    const [info, setInfo] = useState<InfoAttrs[]>([])
    const [typeId, setTypeId] = useState(0)
    const [brandId, setBrandId] = useState(0)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState<{msg: string}[]>()

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
        })
        getAllDevicesAdmin().then(data => {
            if (isErrorResponse(data)) {
                toast.error("Error while getting devices")
            } else {
                device.setDevices(data.rows)
            }
            
            setLoading(false)
        })
    }, [])

    const setDevice = (device: DeviceDto | undefined) => {
        if (!device) {
            return toast.error("Invalid device selected")
        }
        setDeviceId(device.id)
        setName(device.name)
        setPrice(device.price)
        setQuantity(device.quantityInStock)
        setDefaultFiles(device.images)
        device.info && setInfo(device.info.map(di => {
            return {...di, temp_id: di.id}
        }))
        setTypeId(device.type.id)
        setBrandId(device.brand.id)
    }

    const delDevice = async (id: number) => {
        setErrors(undefined)

        const data = await deleteDevice(id)

        if (data && isErrorResponse(data)) {
            setErrors(data.errors)
        } else {
            device.deleteDevice(id)
            toast.success("Successfully deleted device")
        }
    }

    const changeDevice = async () => {
        setErrors(undefined)
        
        if (!defaultFiles && !newFiles) {
            return toast.error("At least 1 file is required")
        }

        if (!deviceId) {
            return toast.error("Select device first")
        }

        const response = await updateDevice(deviceId, {name, price, quantityInStock, typeId, brandId, info, images: newFiles, oldImages: defaultFiles})
        
        if (isErrorResponse(response)) {
            setErrors(response.errors)
        } else {
            device.brands.push(response)
            toast.success("Successfully added new device: " + name)
            
            onClose()
        }
    }

    const setMultipleFiles = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        
        if (files != null) {
            setNewFiles(files)
        }
    }

    const deleteImage = (imageUrl: DeviceImageDto) => {
        setDefaultFiles(defaultFiles?.filter(df => df.imageUrl !== imageUrl.imageUrl))
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


  return (
    <Modal show={show} onHide={onClose} centered>
        {loading ? <Spinner animation='grow'/> :
        <>
            <Modal.Header closeButton>
                <Modal.Title>Change Device Window</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errors ?
                    errors.map(error => 
                        <div className="text-red-500 font-bold align-center mb-8">
                            {error.msg}
                        </div>
                    ) : <></>
                }
                <Form
                    className='space-y-4'
                >
                    {
                        device.devices.length === 0 ?
                            <div>No devices to change</div> :
                            <Form.Select
                                onChange={e => setDevice(device.getDeviceById(parseInt(e.target.value)))}
                            >
                                <option>Open to select device</option>
                                {device.devices.map(d => 
                                    <option value={d.id}>{d.brand.name} {d.name}</option>
                                )}
                            </Form.Select>
                    }
                    {
                        deviceId ?
                        <>
                            <Form.Group>
                                <FloatingLabel
                                    label="Select Type"
                                >
                                    <Form.Select
                                        onChange={e => setTypeId(parseInt(e.target.value))}
                                    >
                                        <option>Change type</option>
                                        {device.types.map(type => {
                                            return (
                                                <option key={type.id} value={type.id} selected={type.id === typeId}>{type.name}</option>
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
                                        <option>Change brand</option>
                                        {device.brands.map(brand => {
                                            return (
                                                <option key={brand.id} value={brand.id} selected={brand.id === brandId}>{brand.name}</option>
                                            )
                                        })}
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
                                <Form.Label className='text-center font-bold'>Add device images or delete current</Form.Label>
                                <div className='flex flex-row flex-wrap'>
                                {defaultFiles?.map(imageUrl =>
                                    <div
                                        className='relative flex flex-row'
                                    >
                                        <Image
                                            src={hostURL + imageUrl.imageUrl}
                                            className='max-w-24'
                                        />
                                        <CrossIcon onClick={() => deleteImage(imageUrl)} />
                                    </div>
                                )}
                                </div>
                                <Form.Control
                                    type='file'
                                    multiple
                                    onChange={e => setMultipleFiles(e)}
                                />
                            </Form.Group>
                            <Form.Group className='border-1 dark:border-[var(--bs-border-color)] rounded-xl p-2 flex flex-col'>
                                <Form.Label className='text-center font-bold'>Device parameters</Form.Label>
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
                            <Button variant='success' onClick={changeDevice}>Change</Button>
                            <Button variant='danger' onClick={() => delDevice(deviceId)}>Delete</Button>
                        </>
                    : <></> }
                    
                </Form>
            </Modal.Body>
        </>
        }
    </Modal>
  )
})

export default ChangeDevice