import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useStore } from '../../../../store/StoreContext'
import { observer } from 'mobx-react-lite'
import { createType } from '../../../../http/typeAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface AddTypeProps {
    show: boolean,
    onClose: () => void
}

const AddType = observer(({show, onClose}: AddTypeProps) => {

    const [name, setName] = useState('')
    const {device} = useStore()

    const addType = async () => {
        if (name.trim().length === 0) {
            toast.error("Type name shouldn't be empty")
        } else if (device.types.find(type => type.name === name)) {
            toast.error("This type already exists!")
        } else {
            try {
                const response = await createType(name)

                if (isErrorResponse(response)) {
                    response.errors.forEach(error => toast.error(error.msg))
                } else {
                    device.types.push(response)
                    toast.success("Successfully added new type: " + name)
                }
            } catch (error) {
                handlerUncaughtError(error)
            }
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

                    <Button variant='success' onClick={addType}>Add</Button>
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
  )
})

export default AddType