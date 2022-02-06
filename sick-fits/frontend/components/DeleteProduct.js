import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// access the apollo graphql cache to update it to re-render with updated state after a delete is made
function update(cache, payload) {
  // cache and payload are injected by apollo
  // need to find the item in cache then evict it.
  cache.evict(cache.identify(payload.data.deleteProduct));
  // payload object will have identifying data on a property named after the mutation run
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      // update property defined to a function that runs when mutation comes back
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure?')) {
          deleteProduct(id).catch((e) => alert(e.message));
        }
      }}
    >
      {children}
    </button>
  );
}
