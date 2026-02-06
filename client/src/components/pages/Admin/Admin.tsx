import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tab, Tabs } from "react-bootstrap"
import { observer } from "mobx-react-lite"
import { useStore } from "../../../store/StoreContext"
import ContentManagement from "../../AdminComponents/Tabs/ContentManagement"
import { hasRequiredRole, Roles } from "../../../store/UserStore"
import AdminTab from "../../AdminComponents/Tabs/AdminTab"
import StatsTab from "../../AdminComponents/Tabs/StatsTab"

const Admin = observer(() => {

  const {user} = useStore()
  const navigate = useNavigate()
  const [key, setKey] = useState<string>('content-management')

  useEffect(() => {
    if (!user || !user.isAuth || !user.user?.role || !hasRequiredRole(Roles.Moderator, user.user.role)) {
      navigate("/")
    }
  }, [])

  return (
    <div className="w-full max-w-9/10 p-4">
      <span className="font-bold text-3xl">Admin Page</span>

      <Tabs
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="mt-3"
      >
        <Tab eventKey="content-management" title="Content Management">
          <ContentManagement/>
        </Tab>

        {(hasRequiredRole(Roles.Admin, user.user!.role)) ?
            <Tab eventKey="admin-tab" title="Admin Tab">
              <AdminTab />
            </Tab>
          : <></>
        }

        {(hasRequiredRole(Roles.Admin, user.user!.role)) ?
            <Tab eventKey="stats-tab" title="Stats Tab">
              <StatsTab />
            </Tab>
          : <></>
        }
      </Tabs>
      
    </div>
  )
})

export default Admin