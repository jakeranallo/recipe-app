import { gql } from 'apollo-boost';

const SingleRecipeQuery = gql`
  query singleRecipe($recipeId: Int) {
    singleRecipe(recipeId: $recipeId) {
      title
      description
      imgOne
      imgTwo
      imgThree
      results {
        id
        img
      }
      ingredients {
        id
        category
        name
        amount
      }
      step {
        id
        src
        title
        description
      }
      user {
        id
      }
    }
  }
`;

export { SingleRecipeQuery };