import { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { sendEmailCode } from '../../../http/userAPI'
import { handlerUncaughtError, isErrorResponse } from '../../../http/errors/ErrorHandler'

const ConfirmCode = () => {

    const [code, setCode] = useState<string>()
    const [errors, setErrors] = useState<{msg: string} []>()

    const confirmEmail = async () => {
        setErrors(undefined)

        if (!code || code.trim().length === 0) {
            return toast.error("Enter code first")
        }

        if (!(code.length === 6)) {
            return toast.error("Code is not valid")
        }

        try {
            const data = await sendEmailCode(code)

            if (isErrorResponse(data)) {
                toast.error("Error occured")
                return setErrors(data.errors)
            }

            toast.success(data.message)
        } catch (error) {
            handlerUncaughtError(error)
        }
        
    }

    return (
        <div>
            <Form>
                {
                    errors ?
                    errors.map(error => 
                        <div className="text-red-500 font-bold align-center mb-8">
                            {error.msg}
                        </div>
                    ) : <></>
                }
                <Form.Label>Enter the code we sent on your old email</Form.Label>
                <Form.Group>
                    <FloatingLabel label="Code">
                        <Form.Control
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
                        />
                    </FloatingLabel>

                    <Button variant="success" onClick={confirmEmail}>Send</Button>
                </Form.Group>
            </Form>
            
        </div>
    )
}

export default ConfirmCode