import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    Platform,
    StatusBar,
    TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get('window');
// import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import Video from "react-native-video"

const API_KEY = "YOUR_SECRET_KEY";

const API_URL = "https://api.pexels.com/videos/popular?per_page=20";

const fetchVideoApi = async () => {
    const data = await fetch(API_URL, {
    });

    const { videos } = await data.json();

    return videos;
};

export default function Main() {
    const [videoData, setVideoData] = useState([1, 2, 3, 4, 5]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const fetchVideoApiCall = async () => {
            const data = await fetchVideoApi();
            // setVideoData(data);
        };
        fetchVideoApiCall();
    }, []);

    if (!videoData) {
        0;
        return <Text>Loading.....</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={videoData}
                onMomentumScrollEnd={(e) => {
                    setActiveIndex(Math.round(e.nativeEvent.contentOffset.y / height));
                }}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    console.log(item);
                    return (
                        <View style={{ width, height: height - 30, position: "relative" }}>
                            <Video
                                source={{
                                    uri: "https://vod-progressive.akamaized.net/exp=1676988780~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2134%2F17%2F435674703%2F1899001271.mp4~hmac=f72dcff7fb1b74591f4d05793ea3f9841dd019592af32dd16432e75027c7251c/vimeo-prod-skyfire-std-us/01/2134/17/435674703/1899001271.mp4",
                                }}
                                isLooping
                                style={[StyleSheet.absoluteFillObject]}
                                shouldPlay={activeIndex === index ? true : false}
                                resizeMode="cover"
                            />
                            <View style={styles.footer}>
                                <View style={styles.userDetails}>
                                    <View style={[styles.userName, styles.spacing]}>
                                        <View
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 50,
                                                borderWidth: 2,
                                                borderColor: "#fff",
                                                overflow: "hidden",
                                                marginRight: 10,
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: "https://randomuser.me/api/portraits/women/42.jpg",
                                                }}
                                                style={{ width: 40, height: 40, resizeMode: "cover" }}
                                            />
                                        </View>
                                        <Text style={[styles.text]}>Ridham Sherathiya. Follow</Text>
                                    </View>
                                    <Text style={[styles.text, styles.spacing]}>
                                        Tag your Best....more
                                    </Text>
                                    <Text style={[styles.text, styles.spacing]}>
                                        Walking Home.
                                    </Text>
                                </View>
                                <View style={styles.iconList}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image
                                            source={require('./like.png')}
                                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                                        />
                                        {/* <AntDesign
                                            style={styles.icon}
                                            name="hearto"
                                            size={24}
                                            color="white"
                                        /> */}
                                        {/* <Text style={styles.text}>2,020</Text> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image
                                            source={require('./share.png')}
                                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                                        />
                                        {/* <Feather
                                            style={styles.icon}
                                            name="message-circle"
                                            size={24}
                                            color="white"
                                        /> */}
                                        {/* <Text style={styles.text}>2,006</Text> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image
                                            source={require('./comment.png')}
                                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                                        />
                                        {/* <Feather
                                            style={styles.icon}
                                            name="message-circle"
                                            size={24}
                                            color="white"
                                        /> */}
                                        {/* <Text style={styles.text}>2,006</Text> */}
                                    </TouchableOpacity>

                                    {/* <Feather
                                        style={styles.icon}
                                        name="send"
                                        size={24}
                                        color="white"
                                    /> */}
                                    {/* <MaterialCommunityIcons
                                        style={styles.icon}
                                        name="dots-vertical"
                                        size={24}
                                        color="white"
                                    /> */}
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 8,
                                            borderWidth: 2,
                                            borderColor: "#fff",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: "https://randomuser.me/api/portraits/women/42.jpg",
                                            }}
                                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
            <View style={styles.header}>
                <Text style={styles.reels}>Reels</Text>
                {/* <Feather
                    style={styles.reelsCamera}
                    name="camera"
                    size={24}
                    color="white"
                /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative",
    },
    header: {
        width: "100%",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    reels: {
        padding: 15,
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    reelsCamera: {
        padding: 15,
    },
    text: {
        color: "white",
        textAlign: "center",
    },
    icon: {
        textAlign: "center",
    },
    footer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 15,
    },
    iconList: {
        justifyContent: "space-around",
        height: "30%",
    },
    userDetails: {
        flex: 1,
        alignItems: "flex-start",
    },
    userName: {
        flexDirection: "row",
        alignItems: "center",
    },
    spacing: {
        paddingBottom: 10,
    },
});
