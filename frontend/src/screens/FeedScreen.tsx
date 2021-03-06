import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Recipe } from '../utils/types'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';
import { DifficultyFeedQuery } from '../gql/queries/difficultyFeed'
import { useQuery } from '@apollo/react-hooks';
import { Header, Hero, Avatar, HeadlineTwo, SmallParagraph } from '../components'

// Joshua Weissman
// Perfect Loaf
// Foodgeek
// Bakerboss Rich
// Bake with Jack
// King Arthur Flour
// Full Proof Baking

export const FeedScreen = ({ navigation }: NavigationInjectedProps) => {
    const [fontsLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), });

    const { loading, error, data } = useQuery(DifficultyFeedQuery, {
        variables: { filter: "Advanced" },
    });

    return (
        <View>
            <Header title='Beginner Recipes' />
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
                                        <SmallParagraph>{recipe.user && recipe.user.userName}</SmallParagraph>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
            </ScrollView>
        </View>
    );
} 