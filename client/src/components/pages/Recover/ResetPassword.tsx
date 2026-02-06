import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { changePassword } from '../../../http/userAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handlerUncaughtError, isErrorResponse } from '../../../http/errors/ErrorHandler'

const ResetPassword = () => {
    const {link} = useParams() as {link: string}
    const [error, setError] = useState<{msg: string} []>()
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const changeUserPassword = async () => {
        try {
            setError(undefined)

            const response = await changePassword(link, password)

            if (response && isErrorResponse(response)) {
                toast.error("Error occured")
                return setError(response.errors)
            }
            toast.success("Changed password successfully!")
            navigate("/login")
        } catch (error) {
            handlerUncaughtError(error)
        }
    }

  return (
    <div className="flex flex-col justify-center items-center border border-gray-300 dark:border-gray-700 rounded-l m-20 p-8 ">
        {
            error ?
            error.map(error => 
                <div className="text-red-500 font-bold align-center mb-8">
                    {error.msg}
                </div>
            ) : <></>
        }
      <Form>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Set new password'
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
            />
            <Button
                className="py-3 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-center"
                onClick={changeUserPassword}  
            >
                Change password
            </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ResetPassword