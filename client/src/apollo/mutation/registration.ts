import { gql } from '@apollo/client';

export const REGISTRATION = gql`
  mutation Registration(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $passwordRepeat: String!
  ) {
    registration(
      userRegistrationInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        passwordRepeat: $passwordRepeat
      }
    )
  }
`;
