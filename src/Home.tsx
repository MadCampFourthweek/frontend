import React, { Component } from "react";
import { Animated, Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native"

const SCREEN_WIDTH = Dimensions.get("window").width;

const xOffset = new Animated.Value(0);

const Screen = props => {
    return <View style={styles.scrollPage}>
        <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
            <View style={styles.planner}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </Animated.View>
    </View>
};

const transitionAnimation = index => {
    return {
        transform: [
            { perspective: 800 },
            {
                scale: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: [0.5, 1, 0.5]
                })
            },
        ]
    };
};

export default class Home extends Component {
    render() {
        return <ImageBackground source={require('../images/back.png')} style={styles.container}>
            <Text style={styles.title}>PLANNER</Text>
            <Text style={styles.date}>22.01.20</Text>
            <View style={{ height: '55%', }}>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                        { useNativeDriver: true }
                    )}
                    horizontal
                    pagingEnabled
                    style={styles.scrollView}
                >
                    <Screen text="Screen 1" index={0} />
                    <Screen text="Screen 2" index={1} />
                    <Screen text="Screen 3" index={2} />
                </Animated.ScrollView>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.time}>06H 45M</Text>
                {chart('시간')}
                {chart('개수')}
            </View>
        </ImageBackground>
    }
}

const chart = (text) => {
    return <View style={{ width: '90%', alignSelf: 'center', marginBottom: 7 }}>
        <Text style={styles.tag}>달성률 ({text})</Text>
        <View style={{ borderRadius: 10, height: 18, borderWidth: 0.5, width: '100%', alignSelf: 'center' }}>
            <View style={{ backgroundColor: "#6667AB66", borderRadius: 10, height: '100%', width: '80%' }} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6667AB33",
        flex: 1, alignItems: 'center'
    },
    scrollView: {
        flexDirection: "row",
    },
    scrollPage: {
        width: SCREEN_WIDTH, marginVertical: 10,
        alignItems: 'center'
    },
    screen: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "white",
        width: '70%', padding: 12
    },
    text: {
        fontSize: 20, flex: 1,
        fontWeight: "bold", textAlign: 'center', textAlignVertical: 'center'
    },
    title: {
        fontSize: 25,
        color: 'black',
        fontWeight: '300',
        marginTop: '12%'
    },
    date: {
        fontSize: 16,
        color: 'black',
        fontWeight: '300', marginBottom: 15
    },
    tag: {
        fontSize: 14, paddingVertical: 5,
        marginHorizontal: 10,
        fontWeight: '400', color: 'black'
    },
    time: {
        fontSize: 23, color: 'black', fontWeight: '300',
        paddingVertical: 5, alignSelf: 'center'
    },
    planner: {
        backgroundColor: 'mistyrose', borderRadius: 10,
        width: '100%', height: '100%'
    },
    bottomView: {
        backgroundColor: 'white', height: '50%',
        width: '85%', borderRadius: 30,
        paddingTop: 8, marginTop: '10%'
    },
})