import { gql } from 'apollo-boost';

const DifficultyFeedQuery = gql`
  query difficultyFeed($filter: String!) {
    difficultyFeed(filter: $filter) {
      id
      title
      description
      imgOne
      imgTwo
      imgThree
      user {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;



export { DifficultyFeedQuery };