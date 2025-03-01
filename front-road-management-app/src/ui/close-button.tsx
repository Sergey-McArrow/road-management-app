import type { FC } from 'react'

type TCloseButtonProps = {
  onClick: () => void
  className?: string
}

export const CloseButton: FC<TCloseButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`ml-auto border border-black bg-white text-gray-500 hover:text-gray-700 ${className}`}
    >
      ✕
    </button>
  )
}
