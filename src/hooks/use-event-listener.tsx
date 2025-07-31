import { useEffect, useRef } from "react"

type EventType = keyof HTMLElementEventMap | string

export function useEventListener<K extends EventType>(
  eventName: K,
  handler: (event: Event) => void,
  element: EventTarget = window
) {
  const savedHandler = useRef<(event: Event) => void>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (!element || !element.addEventListener) return

    const eventListener = (event: Event) => {
      if (savedHandler.current) savedHandler.current(event)
    }

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
