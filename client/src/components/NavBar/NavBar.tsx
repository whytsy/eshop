import ThemeToggle from '../ThemeToggle/ThemeToggle'
import ProfileIcon from './ProfileIcon'
import CartIcon from './CartIcon'
import { Link } from 'react-router-dom'
import ShopIcon from './ShopIcon'

const NavBar = () => {

  return (
    <>
      <div className="
        fixed top-0 left-0 right-0
        sm:relative rounded-b-xl
        flex gap-2 justify-center sm:justify-between justify-self-center
        min-w-8/10
        bg-zinc-200 dark:bg-zinc-900 sm:bg-zinc-50 sm:dark:bg-zinc-800
        py-6 px-8
      ">
        <Link to="/"><ShopIcon /></Link>
        <div className='flex sm:justify-end gap-2'>
          <Link to="/cart"><CartIcon /></Link>
          <ThemeToggle />
          <Link to="/profile"><ProfileIcon /></Link>
        </div>
      </div>
    </>
  )
}

export default NavBar