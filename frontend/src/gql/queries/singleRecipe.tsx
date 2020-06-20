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
      ingredientCategories {
        id
        ingredients {
          name
        }
        name
      }
      steps {
        id
        src
        title
        description
        duration
        notify
        resources {
          id
          title
          src
        }
      }
      user {
        id
      }
    }
  }
`;

export { SingleRecipeQuery };