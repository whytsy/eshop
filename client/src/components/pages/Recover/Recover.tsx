import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { sendRecoverEmail } from '../../../http/userAPI'
import { toast } from 'react-toastify'
import { handlerUncaughtError, isErrorResponse } from '../../../http/errors/ErrorHandler'

const Recover = () => {
    const [error, setError] = useState<{msg: string}[]>()
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")

    const recoverEmail = async () => {
        try {
            setError(undefined)

            const response = await sendRecoverEmail(email)

            if (response && isErrorResponse(response)) {
                toast.error("Error occured")
                setError(response.errors)
            } else {
                toast.success("Successfully sent recovery link to your email!")
                setMessage("Successfully sent recovery link to your email!")
            }
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
      <strong>{message}</strong>
      <Form>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                placeholder='Enter your email'
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
            />
            <Button
                className="py-3 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-center"
                onClick={recoverEmail}  
            >
                Sent email
            </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Recover