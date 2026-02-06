import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useStore } from '../../../../store/StoreContext'
import { observer } from 'mobx-react-lite'
import { createBrand } from '../../../../http/brandAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../../http/errors/ErrorHandler'

interface AddBrandProps {
    show: boolean,
    onClose: () => void
}

const AddBrand = observer(({show, onClose}: AddBrandProps) => {

    const [name, setName] = useState('')
    const {device} = useStore()

    const addBrand = async () => {
        if (name.trim().length === 0) {
            toast.error("Brand name shouldn't be empty")
        } else if (device.brands.find(brand => brand.name === name)) {
            toast.error("This brand already exists!")
        } else {
            try {
                const response = await createBrand(name)

                if (isErrorResponse(response)) {
                    response.errors.forEach(error => toast.error(error.msg))
                } else {
                    device.brands.push(response)
                    toast.success("Successfully added new brand: " + name)
                }
            } catch (error) {
                handlerUncaughtError(error)
            }
        }
    }

  return (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add Brand Window</Modal.Title>
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
                    
                    <Button variant='success' onClick={addBrand}>Add</Button>
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
  )
})

export default AddBrand