import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useStore } from "../../../store/StoreContext"
import { toast } from "react-toastify"
import { validateEmail } from "../../../utils/validation"
import { changeEmail } from "../../../http/userAPI"
import { observer } from 'mobx-react-lite'
import { handlerUncaughtError, isErrorResponse } from "../../../http/errors/ErrorHandler"

const ChangeMail = observer(() => {

    const {user} = useStore()

    const [email, setEmail] = useState<string>()

    const [errors, setErrors] = useState<{msg: string} []>()

    const changeUserEmail = async () => {
        setErrors(undefined)

        if (!email) {
            return toast.error("Enter new email first")
        }

        if (!validateEmail(email)) {
            return toast.error("Email is not valid")
        }

        if (email === user.user?.email) {
            return toast.error("Email is already set")
        }

        try {
            const data = await changeEmail(email)
            
            if (isErrorResponse(data)) {
                toast.error("Error")
                return setErrors(data.errors)
            }

            toast.success(data.message)
        } catch (error) {
            handlerUncaughtError(error)
        }
        
    }

    return (
        <div>
            {
                errors ?
                errors.map(error => 
                    <div className="text-red-500 font-bold align-center mb-8">
                        {error.msg}
                    </div>
                ) : <></>
            }
            <Form>
                <Form.Label>Enter new Email</Form.Label>
                <Form.Group>
                    <FloatingLabel label="New email">
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
                        />
                    </FloatingLabel>

                    <Button variant="success" onClick={changeUserEmail}>Change</Button>
                </Form.Group>
            </Form>
            
        </div>
    )
})

export default ChangeMail