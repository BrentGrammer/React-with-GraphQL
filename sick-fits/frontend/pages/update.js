import UpdateProduct from '../components/UpdateProduct';

// Because we pass in a query string param in the Link in Product.ts to this page, we can destructure an injected props.query to get the data passed
export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
