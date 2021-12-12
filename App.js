import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoints, setCurrentPoints] = useState(0)
    const sky = { uri: "https://cdn.pixabay.com/photo/2012/04/14/16/37/sky-34536_960_720.png" };
    const styles = StyleSheet.create({
        image: {
            width: '100%',
            height: '100%',
            flex: 1
        }
    });
    useEffect(() => {
        setRunning(false)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={sky} resizeMode="cover" style={styles.image}>
            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, zIndex: 30, elevation: 30}}>{currentPoints}</Text>
            <GameEngine
                ref={(ref) => { setGameEngine(ref) }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e) => {
                    switch (e.type) {
                        case 'game_over':
                            setRunning(false)
                            gameEngine.stop()
                            break;
                        case 'new_point':
                            setCurrentPoints(currentPoints + 1)
                            break;
                    }
                }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <StatusBar style="auto" hidden={true} />

            </GameEngine>

            {!running ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 30 }}
                                      onPress={() => {
                                          setCurrentPoints(0)
                                          setRunning(true)
                                          gameEngine.swap(entities())
                                      }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 35 }}>
                            START GAME
                        </Text>
                    </TouchableOpacity>
                </View> : null}
            </ImageBackground>
        </View>
    );
}