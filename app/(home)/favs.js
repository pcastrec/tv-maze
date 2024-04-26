import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Context } from "../_layout";
import { Link } from "expo-router";

export default function Favorites() {

    const { storage, setStorage } = useContext(Context)

    const [favs, setFavs] = useState([])

    useEffect(() => {
        fetchFavs(storage)
    }, [storage])

    const fetchFavs = async data => {
        const promises = data.map(
            id => fetch(`https://api.tvmaze.com/shows/${id}`)
                .then(res => res.json())
                .catch(console.error)
        )
        setFavs(await Promise.all(promises))
    }

    const renderShows = useCallback(({ item }) => {
        return (
            <Link asChild href={{ pathname: '/detail', params: { title: item.name, id: item.id } }}>
                <Pressable>
                    <Image resizeMode="contain" style={styles.image} source={{ uri: item.image?.medium || 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' }} />
                </Pressable>
            </Link>
        )
    }, [])

    return (
        <FlatList data={favs} numColumns={1} renderItem={renderShows}
            contentContainerStyle={{ gap: 16, alignItems: 'center' }}
            style={{ marginVertical: 16 }}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('screen').width,
        aspectRatio: 1
    }
})