import { createContext, useContext, useEffect, useState } from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Context } from "../_layout";

export const Show = createContext()

export default function DetailLayout() {

    const { storage, setStorage } = useContext(Context)

    const [show, setShow] = useState()
    const { id, title } = useLocalSearchParams()

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then(res => res.json())
            .then(data => setShow(data))
            .catch(console.error)
    }, [])

    useEffect(() => {
        storage.includes(id)
    }, [storage])

    const handleHeart = () => {
        storage.includes(id) ?
            setStorage(prev => prev.filter(item => item != id))
            :
            setStorage(prev => [...prev, id])
    }

    return (
        <Show.Provider value={{ show }}>
            <Stack.Screen options={{ title, headerRight: () => <MaterialIcons name={storage.includes(id) ? "heart-broken" : "favorite"} onPress={handleHeart} color={'#D00'} size={32} /> }} />
            <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor: '#05068955' }}>
                <Tabs.Screen name="saison" options={{ tabBarIcon: () => <MaterialIcons name="local-movies" size={24} /> }} />
                <Tabs.Screen name="casting" options={{ tabBarIcon: () => <MaterialIcons name="person-search" size={24} /> }} />
            </Tabs>
        </Show.Provider>
    )
}