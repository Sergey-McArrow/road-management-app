import type { FC, RefObject } from 'react'

type TToggleButtonProps = {
  isActive: boolean
  onClick: () => void
  buttonRef?: RefObject<HTMLButtonElement | null>
  children: React.ReactNode
  className?: string
}

export const ToggleButton: FC<TToggleButtonProps> = ({
  isActive,
  onClick,
  buttonRef,
  children,
  className = '',
}) => {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`rounded px-4 py-2 font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      } ${className}`}
    >
      {children}
    </button>
  )
}
