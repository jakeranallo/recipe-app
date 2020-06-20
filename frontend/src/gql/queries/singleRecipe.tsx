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
        category {
          name
        }
        name
        amount
      }
      steps {
        id
        src
        title
        description
        duration
        notify
      }
      user {
        id
      }
    }
  }
`;

export { SingleRecipeQuery };