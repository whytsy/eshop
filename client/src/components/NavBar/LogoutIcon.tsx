import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "../../http/helper";
import { toast } from "react-toastify";
import { useStore } from "../../store/StoreContext";

const LogoutIcon = () => {

  const {user} = useStore()
  const navigate = useNavigate()

  const logout = () => {
    removeTokens()
    user.setIsAuth(false)
    toast.success("Logout success!")
    navigate("/")
  }

  return (
    <HeaderIcon>
      <button
        onClick={logout}
      >
          <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
      </button>
    </HeaderIcon>
    
  )
}

export default LogoutIcon