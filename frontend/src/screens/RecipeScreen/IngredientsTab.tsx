import React from 'react';
import { View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { colours, fonts, icons } from '../../theme'
import { SvgXml } from 'react-native-svg';
import { useQuery } from '@apollo/react-hooks';
import { SingleRecipeQuery } from '../../gql/queries/singleRecipe'
import { Ingredient } from '../../utils/types'

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

  const [checkedItems, setCheckedItems] = React.useState<Ingredient>({});

  const handleCheck = (ingredient: Ingredient) => {
    Object.values(checkedItems).map(e => e).includes('' + ingredient.id) ?
      setCheckedItems(Object.values(checkedItems).filter(item => item.id !== ingredient.id)) :
      setCheckedItems({ ...checkedItems, [ingredient.id]: ingredient });
    // console.log("checkedItems: ", checkedItems);
    console.log()
  }

  return (
    <View>
      {recipe.ingredients && recipe.ingredients.map((ingredient: Ingredient, i: number) =>
        <View key={i}>
          <CheckboxContainer onPress={() => handleCheck(ingredient)}>
            <Checkbox
              style={{ backgroundColor: checkedItems[ingredient.id] ? colours.positive : colours.strokeGrey }}>
              {checkedItems[ingredient.id] && <SvgXml xml={icons.tick} />}</Checkbox>
            <Paragraph
              style={{ fontFamily: fonts.secondary, color: checkedItems[ingredient.id] ? 'white' : colours.textGrey }}>
              {ingredient.amount} {ingredient.name}</Paragraph>
          </CheckboxContainer>
        </View>
      )}
    </View>
  )
}