import { useState, useEffect } from "react"

/**
 * React hook to sync state with localStorage.
 * @param key Storage key
 * @param initialValue Initial state or function returning initial state
 * @returns [value, setValue] stateful value and setter
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            if (item) {
                return JSON.parse(item) as T
            } else {
                return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const
}
