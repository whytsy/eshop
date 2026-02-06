import { Button, Form } from "react-bootstrap"
import { login, registration } from "../../../http/userAPI"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { toast } from "react-toastify"
import { useStore } from "../../../store/StoreContext"
import { isErrorResponse } from "../../../http/errors/ErrorHandler"

const Login = observer(() => {

  const {user} = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ msg: string }[]>()
  const [message, setMessage] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  

  const click = async () => {
    setErrors([])
    let data
    if (isLogin) {
      data = await login(email, password)
    } else {
      data = await registration(email, password)
    }

    if (isErrorResponse(data)) {
      setErrors(data.errors)
      return toast.error("Error")
    }

    isLogin && setMessage("Successfully created your profile! Now check your email to activate your profile")
    
    user.setUser(data)
    user.setIsAuth(true)
    toast.success("Success!")

    navigate('/profile')
  }


  return (
    <div className="flex flex-col justify-center items-center border border-gray-300 dark:border-gray-700 rounded-l m-20 p-8 ">
      {errors ?
        errors.map(error =>
          <div className="text-red-500 font-bold align-center mb-8">
            {error.msg}
          </div>
        )
        : <></>
      }
      <strong>{message}</strong>
      <Form>
        <Form.Group className="mb-3 flex flex-col gap-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3 flex flex-col gap-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-l"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="mb-4">
        {isLogin
          ?
          <>
            <span>Don't have an account yet? </span>
            <Link onClick={() => {
              setIsLogin(false)
              setErrors([])
              setMessage("")
            }} to="/registration" className="text-blue-500 hover:text-blue-700">Register</Link>
            <br/>
            <span>Can't sign in? </span>
            <Link to="/recover" className="text-blue-500 hover:text-blue-700">Recover</Link>
          </>
          :
          <>
            <span>Have an account? </span>
            <Link onClick={() => {
              setIsLogin(true)
              setErrors([])
              setMessage("")
            }} to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
          </>
        }
        </div>
        
        <Button className="py-3 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-center"
          onClick={click}  
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  )
})

export default Login