import { FC, PropsWithChildren } from 'react'

export const Error: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center text-red-500">
      {children}
    </div>
  )
}
