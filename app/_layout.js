import { useStorage } from "../useStorage";
import { createContext } from "react";
import { Stack } from "expo-router";

export const Context = createContext()

export default function Layout() {

    const [storage, setStorage] = useStorage('favorites', [])

    return (
        <Context.Provider value={{ storage, setStorage }}>
            <Stack>
                <Stack.Screen name="(home)" options={{ title: 'TV-MAZE', headerTitleStyle: { color: '#55ADAB' } }} />
                <Stack.Screen name="detail" options={{ presentation: "modal", animation: "slide_from_right", animationDuration: 1020 }} />
            </Stack>
        </Context.Provider>
    )
}