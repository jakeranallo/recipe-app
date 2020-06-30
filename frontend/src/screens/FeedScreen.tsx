import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../utils/types'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';
import { DifficultyFeedQuery } from '../gql/queries/difficultyFeed'
import { useQuery } from '@apollo/react-hooks';
import { Header, Hero, Avatar, Paragraph, HeadlineTwo, SmallParagraph, Button } from '../components'
import * as Facebook from 'expo-facebook';

// Joshua Weissman
// Perfect Loaf
// Foodgeek
// Bakerboss Rich
// Bake with Jack
// King Arthur Flour
// Full Proof Baking

async function logIn() {
    try {
        await Facebook.initializeAsync('3053194844729001');
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const { id, name } = (await response.json());
            const avatar = `https://graph.facebook.com/${id}/picture`;
        } else {
            // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}

export const FeedScreen = ({ navigation }: NavigationInjectedProps) => {
    const [fontsLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), });

    const { loading, error, data } = useQuery(DifficultyFeedQuery, {
        variables: { filter: "Advanced" },
    });

    return (
        <View>
            <Header title='Beginner Recipes' />
            <Button label="Login With Facebook" onPress={() => { logIn() }} />
            <ScrollView>
                {!fontsLoaded && loading ? <Text>Loading...</Text> :
                    error ? <Text>{error}</Text> :
                        data && data.difficultyFeed.map((recipe: Recipe, i: number) =>
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    navigation.navigate('Recipe', {
                                        recipe: recipe,
                                    });
                                }}>
                                <Hero
                                    imgOne={recipe.imgOne}
                                    imgTwo={recipe.imgTwo}
                                    imgThree={recipe.imgThree} />
                                <View style={{ display: 'flex', flexDirection: 'row', padding: 8 }}>
                                    <View style={{ marginRight: 8 }}>
                                        <Avatar
                                            source={recipe.user && recipe.user.avatar}
                                            onPress={() => {
                                                navigation.navigate('Profile', {
                                                    user: recipe.user && recipe.user.id,
                                                });
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <HeadlineTwo color='white'>{recipe.title}</HeadlineTwo>
                                        <SmallParagraph>{recipe.user && `${recipe.user.firstName} ${recipe.user.lastName}`}</SmallParagraph>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
            </ScrollView>
        </View>
    );
} 