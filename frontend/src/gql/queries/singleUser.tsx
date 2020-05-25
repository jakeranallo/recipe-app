import { gql } from 'apollo-boost';

const SingleUserQuery = gql`
  query singleUser($userId: Int) {
    singleUser(userId: $userId) {
      id
      firstName
      lastName
      avatar
      recipes {
        id
        title
        description
        imgOne
        imgTwo
        imgThree
        results {
          id
        }
      }
    }
  }
`;

export { SingleUserQuery };