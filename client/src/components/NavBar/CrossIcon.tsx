import { XCircleIcon } from '@heroicons/react/24/outline'

interface CrossIconProps {
    onClick: () => void
    className?: string
}

const CrossIcon = ({onClick, className}: CrossIconProps) => {
  return (
    <XCircleIcon
        onClick={onClick}
        className={'h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500 ' + className}
    />
  )
}

export default CrossIcon