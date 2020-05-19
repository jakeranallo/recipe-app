import React from 'react';
import * as  ImagePicker from 'expo-image-picker';
import * as  Permissions from 'expo-permissions';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation'
import getPermission from '../utils/getPermission';
import { useNavigationParam } from 'react-navigation-hooks'

const options = {
    allowsEditing: true,
};

export const ResultScreen = ({ navigation }: NavigationInjectedProps) => {

    const recipeId = useNavigationParam('recipeId');

    const selectPhoto = async () => {
        const status = await getPermission(Permissions.CAMERA_ROLL);
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if (!result.cancelled) {
                const uri = result.uri;
                const type = result.type;
                const n = result.uri.lastIndexOf('/');
                const name = result.uri.substring(n + 1);
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUpload(source)
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

    const cloudinaryUpload = (source) => {
        const data = new FormData()
        data.append('file', source)
        data.append('upload_preset', 'spruce-apparel')
        fetch("https://api.cloudinary.com/v1_1/sprucepartners/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                navigation.navigate('Post', { image: data.secure_url, recipeId })
            }).catch(err => {
                console.log("An Error Occured While Uploading")
            })
    }

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
