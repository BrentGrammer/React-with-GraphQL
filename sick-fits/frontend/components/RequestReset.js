import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

// note: sendUserPasswordResetLink is provided by Keystone and allows us to hook into it to create tokens
// note: never send the token to the browser - bad security
// only gives us code and message when there is an error
// note had to add property to createAuth in keystone.ts in the backend for this to work
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // // refetch currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error); // catch to prevent warning - error is in above useMutation returns.
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request Request</h2>
      <Error error={error} />
      <fieldset>
        {/* *returns null if successful */}
        {data?.sendUserPasswordResetLink === null && (
          <p>Success. Check email for a link.</p>
        )}

        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
