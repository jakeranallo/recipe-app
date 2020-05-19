import * as  ImagePicker from 'expo-image-picker';
import * as  Permissions from 'expo-permissions';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation'
import getPermission from '../utils/getPermission';

const options = {
    allowsEditing: true,
};

export const ResultScreen = ({ navigation }: NavigationInjectedProps) => {

    const selectPhoto = async () => {
        const status = await getPermission(Permissions.CAMERA_ROLL);
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if (!result.cancelled) {
                navigation.navigate('Post', { image: result.uri });
            }
        }
    };

    const takePhoto = async () => {
        const status = await getPermission(Permissions.CAMERA);
        if (status) {
            const result = await ImagePicker.launchCameraAsync(options);
            if (!result.cancelled) {
                navigation.navigate('Post', { image: result.uri });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text onPress={selectPhoto} style={styles.text}>
                Select Photo
        </Text>
            <Text onPress={takePhoto} style={styles.text}>
                Take Photo
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
