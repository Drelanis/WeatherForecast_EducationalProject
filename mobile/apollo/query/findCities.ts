import { gql } from '@apollo/client';

export const FIND_CITIES = gql`
  query FindCities($name: String!) {
    findCities(name: $name) {
      id
      name
      country
    }
  }
`;
