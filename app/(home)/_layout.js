import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarActiveBackgroundColor: '#05068955' }}>
            <Tabs.Screen name="index" options={{ tabBarIcon: () => <MaterialIcons name="search" size={24} /> }} />
            <Tabs.Screen name="favs" options={{ tabBarIcon: () => <MaterialIcons name="favorite" color={'#D00'} size={24} /> }} />
        </Tabs>
    )
}