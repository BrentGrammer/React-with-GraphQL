import { gql, useQuery } from '@apollo/client';
/**
 * Custom hook to check user auth
 */
// special syntax ... on User is when there is a union type returned and you conditionally get properties if the type returned is User
export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO query cart
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
