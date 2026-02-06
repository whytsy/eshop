interface IconAttrs {
  imgPath: string;
  onClick: () => void;
  className?: string;
  alt?: string;
}

const Icon = ({imgPath, onClick, className, alt}: IconAttrs) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={className ?? "p-2 rounded-sm bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"}
      >
        <img src={imgPath} className='h-6 w-6 text-gray-500' alt={alt ?? ''} />
      </button>
    </div>
  )
}

export default Icon