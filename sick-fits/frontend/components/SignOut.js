import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

// this is an ex of an unnamed mutation
// you don't need parens for endSession since it has no args.
// endSession is a keystone builtin on the backend we can use.
const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  // comes from built in endSession mutation from keystone
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    // refetch updated loggin (out) user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
