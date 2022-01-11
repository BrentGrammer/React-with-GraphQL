import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # need to name a mutation to pass in variables
    # list variables passed in and types here
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # can do nested creations with keystone like this - create the relationship with the parameters in a create attribute.
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # return these fields from the query
      id
      price
      description
      status
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'initial name',
    price: 111,
    description: 'initial description',
    image: '',
  });

  // hook up mutation to component and pass in variables. inputs match up to the var args in the mutation
  // useMutation returns a function to run the mutation passed in and query results/data
  // note that these are reactive variables (data error loading will update)
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // res.data will have the query data and record fields
        const res = await createProduct(); // you can also pass in variables here if needed, { variables: ... }
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            id="image"
            name="image"
            type="file"
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
