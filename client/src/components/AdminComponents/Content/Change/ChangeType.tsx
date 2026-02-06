import { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useStore } from '../../../../store/StoreContext'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { changeType, deleteType, getAllTypes } from '../../../../http/typeAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface ChangeTypeProps {
    show: boolean,
    onClose: () => void
}

const ChangeType = observer(({show, onClose}: ChangeTypeProps) => {
    const [name, setName] = useState('')
    const {device} = useStore()
    const [typeId, setTypeId] = useState<string>()

    useEffect(() => {
        getAllTypes().then(data => {
            if (isErrorResponse(data)) {
                toast.error("Error while getting types")
            } else {
                device.setTypes(data)
            }
        })
    }, [])

    const changeTypeName = async () => {
        if (!typeId || name.trim().length === 0) {
            toast.error("Type name shouldn't be empty")
        } else {
            try {
                const response = await changeType(parseInt(typeId), name)

                if (isErrorResponse(response)) {
                    response.errors.forEach(error => toast.error(error.msg))
                } else {
                    device.types.push(response)
                    toast.success("Successfully added new type: " + name)
                    onClose()
                }                
            } catch (error) {
                handlerUncaughtError(error)
            }
            
        }
    }

    const removeType = async () => {
        if (!typeId) {
            toast.error("Select type first")
        } else {
            await deleteType(parseInt(typeId))
            device.deleteType(parseInt(typeId))
            toast.success("Successfully deleted type: " + name)
            onClose()
        }
    }

  return (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add Type Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    {
                        device.types.length === 0 ? 
                            <div>No types to change</div> :

                            <FloatingLabel label="Select type">
                                <Form.Select
                                    onChange={e => setTypeId(e.target.value)}
                                >
                                    <option>Open to select type</option>
                                    {device.types.map(type => 
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    )}
                                </Form.Select>
                            </FloatingLabel>
                    }
                    {typeId ? 
                        <>
                            <FloatingLabel
                                label="Type name"
                                className='mb-3'
                            >
                                <Form.Control
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Enter name'
                                />
                            </FloatingLabel>
                            <Button variant='success' onClick={changeTypeName}>Change</Button>
                            <Button variant='danger' onClick={removeType}>Delete</Button>
                        </>
                    : <></>}
                    

                    
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
  )
})

export default ChangeType