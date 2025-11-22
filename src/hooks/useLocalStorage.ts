import {type Dispatch, type SetStateAction, useEffect, useState} from "react";

export default function useLocalStorage<T>(initialState: T, key: string): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const storedValues = localStorage.getItem(key)
        if (!storedValues) return initialState

        try {
            return JSON.parse(storedValues) as T
        } catch (e) {
            console.error(e)
            return initialState
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}