import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { recipes } from '../utils/mockData'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';

export const FeedScreen = ({ navigation }: NavigationInjectedProps) => {
  const [isLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), });

  return (
    <View>
      {isLoaded &&
        <ScrollView>
          <Text style={{ fontFamily: 'Neuton-Bold', fontSize: 40, color: 'white' }}>Latest Recipes</Text>
          {recipes ? recipes.map((recipe) =>
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
                source={{ uri: recipe.user.avatar }}
                style={{ width: 100, height: 100 }} />
              <Text>{recipe.user.name}</Text>
            </TouchableOpacity>
          ) :
            <Text>Loading...</Text>}
        </ScrollView>
      }
    </View>
  );
}