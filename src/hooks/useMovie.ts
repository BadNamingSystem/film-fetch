// noinspection ExceptionCaughtLocallyJS

import {useEffect, useState} from "react";
import {getJSON} from "../helpers.ts";
import useDebounce from "./useDebounce.ts";
import {API_URL} from "../config.ts";
import type {MovieObj} from "../types.ts";

export default function useMovie(query: string, callback?: () => void) {
    const [movies, setMovies] = useState<MovieObj[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const debouncedQuery = useDebounce(query, 500)

    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.length < 3) {   // Don't fetch with an empty/short query
            setMovies([])
            setError("")
            return
        }
        callback?.()

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError("")    // Clear any previous errors before fetching data
                const data = await getJSON(`${API_URL}?s=${debouncedQuery}`, "Failed to fetch movies")
                if (data.Response === "False") throw new Error("Cannot find specified movie")
                setMovies(data.Search)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        void fetchMovies()
    }, [debouncedQuery, callback])

    return {movies, isLoading, error}
}