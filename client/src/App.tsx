import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar.tsx'
import Router from './components/Router/Router.tsx'
import { check } from './http/userAPI.ts'
import { Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Bounce, ToastContainer } from 'react-toastify'
import { themeStore } from './store/ThemeStore.ts'
import { useStore } from './store/StoreContext.tsx'
import { handlerUncaughtError, isErrorResponse } from './http/errors/ErrorHandler.ts'
import Footer from './components/Footer/Footer.tsx'

const App = observer(() => {
  const { user } = useStore()
  const { theme } = themeStore
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {

      setLoading(false)

      if (isErrorResponse(data)) {
        return user.setIsAuth(false)
      }

      user.setIsAuth(true)
      user.setUser({id: data.id, email: data.email, role: data.role})
    }).catch(e => {
      setLoading(false)
      handlerUncaughtError(e)
    })
  }, [])


  return (
    <>
      {loading ? <Spinner animation='grow' /> :
        <div className="
          relative min-h-screen
          bg-zinc-50 dark:bg-zinc-800
          text-gray-900 dark:text-gray-100
          transition-colors duration-200
          flex flex-col sm:space-y-12 items-center
          text-gray-800 dark:text-gray-200
          text-xs sm:text-sm lg:text-base
        ">
          <div className='sm:absolute w-full min-h-30 sm:min-h-80 bg-[url("../img/bg_shop_light.jpg")] dark:bg-[url("../img/bg_shop_dark.jpg")] transition duration-300 bg-cover bg-center z-20 sm:z-5'>
            <NavBar />
          </div>
          
          <div className='sm:mt-58 w-9/10 md:w-8/10 min-h-30 sm:rounded-t-xl p-2 bg-zinc-50 dark:bg-zinc-800 z-10'>
            <Router/>
          </div>

          <Footer />
        </div>
      }
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
    </>
  )
})

export default App
