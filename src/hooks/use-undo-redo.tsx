import { useState, useCallback } from "react"

interface UndoRedo<T> {
  present: T
  past: T[]
  future: T[]
}

export function useUndoRedo<T>(initialPresent: T) {
  const [state, setState] = useState<UndoRedo<T>>({
    past: [],
    present: initialPresent,
    future: [],
  })

  const set = useCallback(
    (newPresent: T) => {
      setState(({ past, present }) => ({
        past: [...past, present],
        present: newPresent,
        future: [],
      }))
    },
    [setState]
  )

  const undo = useCallback(() => {
    setState(({ past, present, future }) => {
      if (past.length === 0) return { past, present, future }
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [setState])

  const redo = useCallback(() => {
    setState(({ past, present, future }) => {
      if (future.length === 0) return { past, present, future }
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    })
  }, [setState])

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  return { state: state.present, set, undo, redo, canUndo, canRedo }
}
