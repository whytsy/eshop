import { UserCircleIcon as NoAuthIcon } from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon.tsx";
import { UserCircleIcon as AuthIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/StoreContext.tsx";

const ProfileIcon = observer(() => {
  const {user} = useStore()
  return (
    <HeaderIcon>
      <button
        onClick={() => {}}
      >
        {user.isAuth ?
          <AuthIcon className="h-6 w-6" />
        :
          <NoAuthIcon className="h-6 w-6" />
        }
      </button>
    </HeaderIcon>
    
  )
})

export default ProfileIcon