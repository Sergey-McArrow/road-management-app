import { type RefObject, useEffect } from 'react'

type TElementRef = RefObject<HTMLElement | null>

export const useOutsideClick = (
  ref: TElementRef,
  handler: () => void,
  excludeRefs: TElementRef[] = []
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      const isInsideExcluded = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current &&
          excludeRef.current.contains(event.target as Node)
      )

      if (!isInsideExcluded) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler, excludeRefs])
}
