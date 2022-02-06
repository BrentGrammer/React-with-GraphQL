import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  // grab page from query param set by Pagination and parse it to a number to pass into Pagination for math
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      {/* Page will be passed in via query params because we have a [page].js that is rendered when products/<page> is updated by Pagination.js component */}
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
