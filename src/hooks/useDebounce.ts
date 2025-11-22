import {useEffect, useRef, useState} from "react";

export default function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const isInitialMount = useRef(true)

    useEffect(() => {
        // Skip the effect on the initial render to prevent immediate changes
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Return a cleanup function that will be called every time `value` or `delay` changes.
        // Cancel the previous timer and prevent the debounced value from updating prematurely.
        return () => clearTimeout(handler)
    }, [value, delay]) // Only re-call effect if value or delay changes

    return debouncedValue
}
