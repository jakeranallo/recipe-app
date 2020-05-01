import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../utils/types'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';
import { DifficultyFeedQuery } from '../gql/queries/difficultyFeed'
import { useQuery } from '@apollo/react-hooks';

export const FeedScreen = ({ navigation }: NavigationInjectedProps) => {
  const [fontsLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), });

  const { loading, error, data } = useQuery(DifficultyFeedQuery, {
    variables: { filter: "Advanced" },
  });

  console.log(data)

  return (
    <View>
      {!fontsLoaded && loading ? <Text>Loading...</Text> :
        error ? <Text>{error}</Text> :
          <ScrollView>
            <Text style={{ fontFamily: 'Neuton-Bold', fontSize: 40, color: 'white' }}>Latest Recipes</Text>
            {data.map((recipe: Recipe) =>
              <TouchableOpacity
                key={recipe.id}
                onPress={() => {
                  navigation.navigate('Recipe', {
                    recipe: recipe,
                  });
                }}>
                <View>
                  <Image
                    source={{ uri: recipe.imgOne }}
                    style={{ width: '100%', height: 400 }} />
                  <Image
                    source={{ uri: recipe.imgTwo }}
                    style={{ width: 100, height: 100 }} />
                  <Image
                    source={{ uri: recipe.imgThree }}
                    style={{ width: 100, height: 100 }} />
                </View>
                <Text>{recipe.title}</Text>
                <Image
                  source={{ uri: recipe.user && recipe.user.avatar }}
                  style={{ width: 100, height: 100 }} />
                <Text>{recipe.user && `${recipe.user.firstName} ${recipe.user.lastName}`}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
      }
    </View>
  );
} 