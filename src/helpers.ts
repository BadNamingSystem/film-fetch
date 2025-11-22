// noinspection ExceptionCaughtLocallyJS

import {TIMEOUT_SEC} from "./config.ts";

export const average = (arr: number[]): number =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0)

const timeout = function (s: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} seconds.`))
        }, s * 1000)
    })
}

export const getJSON = async (url: string, errorMsg = "Failed to fetch data") => {
    const res = await Promise.race([
        fetch(url),
        timeout(TIMEOUT_SEC)
    ]) as Response

    const data = await res.json()
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`)
    return data
}
