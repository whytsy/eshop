import { type JSX } from 'react'

type HeaderIconProps = {
  children: string | JSX.Element | JSX.Element[]
}

const HeaderIcon = ({children}: HeaderIconProps) => {
  return (
    <div className='
      p-2 flex items-center rounded-3xl
      bg-zinc-300 dark:bg-zinc-800 sm:bg-zinc-200 sm:dark:bg-zinc-700
      hover:bg-zinc-300 dark:hover:bg-zinc-600
      border-1 border-zinc-300 dark:border-zinc-600
      text-gray-800 dark:text-gray-200
      focus:outline-none transition duration-200'>
        {children}
    </div>
  )
}

export default HeaderIcon