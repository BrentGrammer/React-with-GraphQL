import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

// query string param id is passed from update.js page which gets it from Product.js Link passing a query string param in the url
export default function UpdateProduct({ id }) {
  // get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // get mutation to update product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // need form to handle updates
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch((e) => console.error(e));
        // // res.data will have the query data and record fields
        // const res = await createProduct(); // you can also pass in variables here if needed, { variables: ... }
        // clearForm();
        // Router.push({ pathname: `/product/${res.data.createProduct.id}` });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={loading}>
        <label htmlFor="image">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Description
          <textarea
            id="description"
            name="description"
            type="textarea"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
