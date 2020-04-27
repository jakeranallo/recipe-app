import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'

export const RecipeScreen = () => {
  const recipe = useNavigationParam('recipe');
  return (
    <ScrollView>
      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
    </ScrollView>
  );
}
