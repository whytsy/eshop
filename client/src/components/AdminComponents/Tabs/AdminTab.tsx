import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useStore } from '../../../store/StoreContext'
import { useNavigate } from 'react-router-dom'
import { hasRequiredRole, isGraterRole, Roles } from '../../../store/UserStore'
import { FloatingLabel, Form, ListGroup } from 'react-bootstrap'
import type { UserDto } from '../../../types/user.types'
import { getAllUsers, setUserRole } from '../../../http/userAPI'
import { isErrorResponse } from '../../../http/errors/ErrorHandler'
import { toast } from 'react-toastify'

const AdminTab = observer(() => {

    const {user} = useStore()
    const navigate = useNavigate()

    const [users, setUsers] = useState<UserDto[]>()
    const [usersFiltered, setUsersFiltered] = useState<UserDto[]>()

    const loadUsers = async () => {
        const response = await getAllUsers()

        if (isErrorResponse(response)) {
            return toast.error("Failed to load users")
        }

        setUsers(response)
        setUsersFiltered(response)
    }

    useEffect(() => {
        if (!user.isAuth || !user.user?.role || !hasRequiredRole(Roles.Admin, user.user.role)) {
            navigate("/")
        } else {
            loadUsers()
        }
    }, [])

    const avaliableRoles = Object.values(Roles).filter(role => isGraterRole(user.user!.role, role))

    const sendChanges = async (id: number, role: string) => {

        if (!avaliableRoles.includes(role as Roles)) {
            return toast.error("Invalid role")
        }

        const originalUser = users!.find(user => user.id === id)
        
        if (originalUser?.role === role) {
            return toast.warn("Nothing changed to be saved!")
        }

        const response = await setUserRole(id, role as Roles)

        if (response && isErrorResponse(response)) {
            return response.errors.forEach(error => toast.error(error.msg))
        }

        toast.success("")
    }

    const [searchType, setSearchType] = useState("No filter")

    const searchTypes = ["Query", "Role", "No filter"]


    const renderBySearchType = (value: string) => {
        switch (searchType) {
            case "No filter":
                setUsersFiltered(users)
                break
            case "Role":
                setUsersFiltered(users?.filter(user => user.role === value))
                break
            case "Query":
                setUsersFiltered(users?.filter(user => user.email.startsWith(value)))
                break
            default:
                toast.error("Something went wrong...")
        }
    }

    return (
        <div>
            <h1>Admin Tab</h1>
            <h3>Manage users here</h3>
            
            <Form>
                <Form.Group>
                    <Form.Label>Select filter type</Form.Label>
                    <FloatingLabel label="Search by">
                        <Form.Select
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            {
                                searchTypes.map(st => 
                                    <option
                                        key={st}
                                        value={st}
                                        selected={st === searchType}
                                    >
                                        {st}
                                    </option>
                                )
                            }
                        </Form.Select>
                    </FloatingLabel>
                    {
                        (searchType && searchType !== "" && searchType !== "No filter") ? 
                            <>
                                <Form.Label>{searchType}</Form.Label>
                                {
                                    searchType === "Query" ? 
                                        <FloatingLabel label="Email">
                                            <Form.Control
                                                type='text'
                                                onChange={(e) => renderBySearchType(e.target.value)}
                                            />
                                        </FloatingLabel>
                                        
                                    :
                                        <FloatingLabel label="Role">
                                            <Form.Select
                                                onChange={(e) => renderBySearchType(e.target.value)}
                                            >
                                                <option>Open to select role</option>
                                                {avaliableRoles.map(role =>
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                }
                            </>
                        : <></>
                    }
                </Form.Group>
                
                {
                    usersFiltered ?
                    <ListGroup>
                        {usersFiltered.length !== 0 ?
                            usersFiltered.map(user => 
                                <ListGroup.Item key={user.id}>
                                    {user.email}
                                    <Form.Select
                                        value={user.role}
                                        onChange={(e) => sendChanges(user.id, e.target.value)}
                                    >
                                        {avaliableRoles.map(role =>
                                            <option
                                                key={role}
                                                value={role}
                                            >
                                                {role}
                                            </option>
                                        )}
                                    </Form.Select>
                                </ListGroup.Item>
                            )
                        : <div>No users found</div>
                        }
                    </ListGroup>
                    : <></>
                }
            </Form>
        </div>
    )
})

export default AdminTab