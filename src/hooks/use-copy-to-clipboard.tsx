import { useState, useCallback } from "react"

export function useCopyToClipboard() {
    const [isCopied, setCopied] = useState(false)

    const copy = useCallback(async (text: string) => {
        if (!navigator.clipboard) {
            console.warn("Clipboard API not supported")
            return false
        }
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            // Reset after a short delay
            setTimeout(() => setCopied(false), 2000)
            return true
        } catch (err) {
            console.error("Failed to copy!", err)
            setCopied(false)
            return false
        }
    }, [])

    return { isCopied, copy }
}
