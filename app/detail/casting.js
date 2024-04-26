import { useCallback, useContext } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Show } from "./_layout";

export default function Casting() {

    const { show } = useContext(Show)

    const renderCast = useCallback(({ item }) => {
        return (
            <View style={styles.card}>
                <Image style={{ width: '60%', aspectRatio: 1 }} source={{ uri: item.person.image?.medium }} resizeMode="cover" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{item.person.name}</Text>
                    <Text>as</Text>
                    <Text>{item.character.name}</Text>
                </View>
            </View>
        )
    }, [])

    return (
        <FlatList data={show?._embedded.cast} renderItem={renderCast} contentContainerStyle={{ marginVertical: 24, gap: 24 }} />

    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 24,
        alignItems: "center",
        flexDirection: 'row',
        borderColor: '#CACACA',
        justifyContent: "space-between",
    }
})