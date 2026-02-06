import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { activateProfile } from '../../../http/userAPI'
import { isErrorResponse } from '../../../http/errors/ErrorHandler'

const AccountActivation = () => {
  const {link} = useParams() as {link: string}
  const [error, setError] = useState<{ msg: string }[]>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const activate = async () => {
        const data = await activateProfile(link)

        if (data && isErrorResponse(data)) {
          setError(data.errors)
          setLoading(false)
        } else {
          setLoading(false)
        }
    }

    activate()
  }, [])

  if (loading) {
    return (
      <Spinner animation='grow'/>
    )
  }

  return (
    <>
      {error
        ?
          error.map(error =>
          <div className="text-red-500 font-bold align-center mb-8">
            {error.msg}
            </div>
          )
        :
        <div className="text-zinc-500 font-bold align-center mb-8">
          Your profile was activated successfully!
        </div>
      }
    </>
  )
}

export default AccountActivation