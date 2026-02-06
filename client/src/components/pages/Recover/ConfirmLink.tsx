import { useNavigate, useParams } from "react-router-dom"
import { confirmEmail } from "../../../http/userAPI"
import { toast } from "react-toastify"
import { handlerUncaughtError, isErrorResponse } from "../../../http/errors/ErrorHandler"

const ConfirmLink = () => {

    const {link} = useParams() as {link: string}
    const navigate = useNavigate()

    const confirmLink = async () => {
        try {
            const data = await confirmEmail(link)
            
            if (isErrorResponse(data)) {
                return data.errors.forEach(error => toast.error(error.msg))
            }
            
            toast.success(data.message)
            navigate("/login")
        } catch (error) {
            handlerUncaughtError(error)
        }
    }

  return (
    <>{confirmLink()}</>
  )
}

export default ConfirmLink