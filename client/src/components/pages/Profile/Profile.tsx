import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import HeaderIcon from "../../NavBar/HeaderIcon"
import { Button, Card } from "react-bootstrap"
import { useStore } from "../../../store/StoreContext"
import { hasRequiredRole, Roles } from "../../../store/UserStore"
import OrderList from "../../Orders/OrderList"

const Profile = () => {

  const {user} = useStore()
  const navigate = useNavigate()

  const goToAdmin = () => {
    return navigate("/admin")
  }

  useEffect(() => {
    if (!user.user || !user.isAuth) {
      navigate("/login")
    }
  }, [])
  
  return (
    <>
      {user.user && user.isAuth && 
        <div className="p-2 space-y-8">
          <Card className="grid place-items-center p-3">
            <div>
              <Card.Header className="flex flex-row">
                <HeaderIcon><UserCircleIcon className="h-6 w-6 text-gray-500" /></HeaderIcon>
                <Card.Title className="align-content-center px-3">{user.user.role} profile</Card.Title>
              </Card.Header>
              <Card.Body className="bg-[var(--bs-card-cap-bg)]">
                <p>User id: {user.user.id}</p>
                <p>Email: {user.user.email}</p>
                {
                  user.user.role === Roles.User
                  ?
                  <Button variant="warning" onClick={() => {
                    navigate("/profile/change-email")
                  }}>Change email</Button>
                  :
                  <></>
                }
              </Card.Body>
              {
                hasRequiredRole(Roles.Moderator, user.user.role)
                  ?
                  <Card.Footer className="flex items-center justify-content-center">
                    <Button
                        className="py-3 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-center"
                        onClick={goToAdmin}  
                    >
                        Go to admin page
                    </Button>
                  </Card.Footer>
                  :
                  <></>
              }

            </div>
          </Card>
          
          <OrderList />
        </div>
      }
    </>
    
  )
}

export default Profile