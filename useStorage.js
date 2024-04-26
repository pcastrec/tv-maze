import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"

export const useStorage = (key, defaultValue) => {

    const [storage, setStorage] = useState(defaultValue)

    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(JSON.parse)
            .then(data => setStorage(data ?? defaultValue))
            .catch(console.error)
    }, [])

    useEffect(() => {
        AsyncStorage.setItem(key, JSON.stringify(storage))
    }, [storage])

    return [storage, setStorage]
}