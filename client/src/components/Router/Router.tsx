import { Route, Routes } from 'react-router-dom'
import AccountActivation from '../pages/AccountActivation/AccountActivation'
import Admin from '../pages/Admin/Admin'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'
import Shop from '../pages/Shop/Shop'
import Recover from '../pages/Recover/Recover'
import ResetPassword from '../pages/Recover/ResetPassword'
import Device from '../pages/Device/Device'
import ChangeMail from '../pages/Recover/ChangeMail'
import ConfirmCode from '../pages/Recover/ConfirmCode'
import ConfirmLink from '../pages/Recover/ConfirmLink'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Shop />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Login/>}/>
        <Route path='/device/:id' element={<Device/>}/>
        <Route path='/activate/:link' element={<AccountActivation />}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/recover' element={<Recover/>}/>
        <Route path='/recover/:link' element={<ResetPassword/>}/>
        <Route path='/profile/change-email' element={<ChangeMail/>} />
        <Route path='/profile/change-email/code' element={<ConfirmCode/>} />
        <Route path='/profile/change-email/:link' element={<ConfirmLink/>} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  )
}

export default Router