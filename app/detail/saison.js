import { useCallback, useContext } from "react";
import { FlatList, Image, View } from "react-native";
import { Show } from "./_layout";

export default function Saison() {

    const { show } = useContext(Show)

    const renderSeason = useCallback(({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ aspectRatio: 1 }} source={{ uri: item.image?.medium }} resizeMode="contain" />
            </View>
        )
    }, [])

    return (
        <FlatList data={show?._embedded.seasons} renderItem={renderSeason} contentContainerStyle={{ marginVertical: 8, gap: 8 }} />

    )
}