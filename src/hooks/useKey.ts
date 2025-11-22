import {useEffect} from "react";

export default function useKey(key: string, action: () => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action?.()
            }
        }
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [action])
}