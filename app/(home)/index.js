import { Dimensions, FlatList, Image, Keyboard, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useCallback, useState } from "react";
import { Link } from "expo-router";

export default function Search() {

    const [value, setValue] = useState('')
    const [shows, setShows] = useState([])

    const handleSubmit = () => {
        fetch('https://api.tvmaze.com/search/shows?q=' + value)
            .then(res => res.json())
            .then(data => setShows(data))
            .catch(console.error)
    }

    const renderShows = useCallback(({ item }) => {
        return (
            <Link asChild href={{ pathname: '/detail', params: { title: item.show.name, id: item.show.id } }}>
                <Pressable>
                    <Image resizeMode="contain" style={styles.image} source={{ uri: item.show.image?.medium || 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' }} />
                </Pressable>
            </Link>
        )
    }, [])

    const handleClearIcon = () => {
        setValue('') // Marche pas
        Keyboard.dismiss()
    }

    return (
        <View style={styles.content}>
            <Searchbar
                placeholder="Search ..."
                onSubmitEditing={handleSubmit}
                onChangeText={str => setValue(str)}
                style={{ backgroundColor: '#05068955' }}
                right={() => value && <MaterialIcons style={{ marginRight: 8, padding: 5 }} name="close" size={18} onPress={handleClearIcon} />}
            // onClearIconPress={handleClearIcon}
            // clearIcon={() => <MaterialIcons name="close" size={18} />}
            />
            <FlatList data={shows} numColumns={2} renderItem={renderShows}
                contentContainerStyle={{ gap: 8, alignItems: 'center' }}
                columnWrapperStyle={{ gap: 8 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: 8,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10
    },
    image: {
        width: Dimensions.get('screen').width / 2,
        aspectRatio: 1
    }
})