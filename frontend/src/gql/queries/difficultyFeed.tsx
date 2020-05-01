import { gql } from 'apollo-boost';

const DifficultyFeedQuery = gql`
  query difficultyFeed($filter: String!) {
    difficultyFeed(filter: $filter) {
      title
      description
      imgOne
      imgTwo
      imgThree
      user {
        firstName
        lastName
        avatar
      }
    }
  }
`;



export { DifficultyFeedQuery };