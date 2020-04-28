import React from 'react';
import { Text, Button, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'

const IngredientsTab = ({ recipe }) => {
  return (
    <View>
      {recipe.ingredients && recipe.ingredients.map((ingredient, i) =>
        <View>
          <Text key={i}>{ingredient.subhead}</Text>
          <View>{ingredient.list.map((item, i) =>
            <Text key={i}>{item}</Text>)}
          </View>
        </View>)}
    </View>
  );
}

const ResultsTab = ({ recipe }) => {
  return (
    <View>
      {recipe.results && recipe.results.map((result, i) =>
        <Image
          key={i}
          source={{ uri: result }}
          style={{ width: 100, height: 100 }} />)}
    </View>
  );
}

export const RecipeScreen = () => {
  const recipe = useNavigationParam('recipe');
  const [isActive, setActive] = React.useState(1)
  return (
    <>
      <View>
        <Text>{recipe.title}</Text>
        <Text>{recipe.description}</Text>
        <TouchableOpacity
          onPress={() => setActive(1)}>
          <Text style={{ color: isActive == 1 ? 'red' : 'white' }}>Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive(2)}>
          <Text style={{ color: isActive == 2 ? 'red' : 'white' }}>Results</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isActive === 1 ? <IngredientsTab recipe={recipe} /> : <ResultsTab recipe={recipe} />}
      </ScrollView>
    </>
  );
}
