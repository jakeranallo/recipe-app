import React from 'react';
import { View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { colours, fonts, icons } from '../../theme'
import { SvgXml } from 'react-native-svg';
import { useQuery } from '@apollo/react-hooks';
import { SingleRecipeQuery } from '../../gql/queries/singleRecipe'
import { Ingredient } from '../../utils/types'
import { HeadlineTwo } from '../../components';

const Paragraph = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${colours.textGrey};
`

const Checkbox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`

const CheckboxContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  flex-direction: row;
`

export const IngredientsTab = () => {

  const recipeId = useNavigationParam('recipe');
  const { loading, error, data } = useQuery(SingleRecipeQuery, {
    variables: { recipeId: recipeId.id },
  });
  const recipe = data.singleRecipe[0]

  const [checkedItems, setCheckedItems] = React.useState<number[]>([]);

  const handleCheck = (ingredient: Ingredient) => {
    !checkedItems.includes(ingredient.id) ? setCheckedItems([...checkedItems, ingredient.id]) :
      setCheckedItems(checkedItems.filter((item: number) => item !== ingredient.id))
  };

  return (
    <View>
      {recipe.ingredientCategories && recipe.ingredientCategories.map((category: Ingredient, i: number) =>
        <View key={i}>
          <View>
            <HeadlineTwo color='white'>{category.name}</HeadlineTwo>
          </View>
          {category.ingredients.map((ingredient, i) =>
            <View key={i}>
              <CheckboxContainer onPress={() => handleCheck(ingredient)}>
                <Checkbox
                  style={{ backgroundColor: checkedItems.includes(ingredient.id) ? colours.positive : colours.strokeGrey }}>
                  {checkedItems.includes(ingredient.id) && <SvgXml xml={icons.tick} />}</Checkbox>
                <Paragraph
                  style={{ fontFamily: fonts.secondary, color: checkedItems.includes(ingredient.id) ? 'white' : colours.textGrey }}>
                  {ingredient.amount} {ingredient.name}</Paragraph>
              </CheckboxContainer>
            </View>
          )}
        </View>
      )}
    </View>
  )
}