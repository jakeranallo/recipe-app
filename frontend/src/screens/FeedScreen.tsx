import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../utils/types'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';
import { DifficultyFeedQuery } from '../gql/queries/difficultyFeed'
import { useQuery } from '@apollo/react-hooks';
import { Header, Hero, Avatar, Paragraph, HeadlineTwo, SmallParagraph } from '../components'
import { SvgXml } from 'react-native-svg';
import { logo } from '../theme/icons'

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
            <Header title='Beginner Recipes' renderLeft={<SvgXml xml={logo} />} />
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
                                <Hero imgOne={recipe.imgOne} imgTwo={recipe.imgTwo} imgThree={recipe.imgThree} />
                                <View style={{ display: 'flex', flexDirection: 'row', padding: 8 }}>
                                    <View style={{ marginRight: 8 }}>
                                        <Avatar
                                            source={recipe.user && recipe.user.avatar} />
                                    </View>
                                    <View>
                                        <HeadlineTwo>{recipe.title}</HeadlineTwo>
                                        <SmallParagraph>{recipe.user && `${recipe.user.firstName} ${recipe.user.lastName}`}</SmallParagraph>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
            </ScrollView>
        </View>
    );
} 