import { useState, useEffect } from "react"

/**
 * React hook to sync state with sessionStorage.
 * @param key Storage key
 * @param initialValue Initial state or function returning initial state
 * @returns [value, setValue] stateful value and setter
 */
export function useSessionStorage<T>(key: string, initialValue: T | (() => T)) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = sessionStorage.getItem(key)
            if (item) {
                return JSON.parse(item) as T
            } else {
                // Support lazy initial value
                return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
            }
        } catch (error) {
            console.warn(`Error reading sessionStorage key "${key}":`, error)
            return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
        }
    })

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.warn(`Error setting sessionStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const
}
