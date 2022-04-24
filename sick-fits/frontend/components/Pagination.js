import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

// to get counts keystone.js framework provides meta shortcuts with underscores
// in this case _all<EntityNamePlural>Meta which you can get a count prop on
export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

// page is being pased in as a query param from products.js page
export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;

  // result of running keystone meta helper query defined above
  const { count } = data._allProductsMeta;
  // round up to the next whole number to get last page if there are less than full page of results there
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        {/*  for SEO */}
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      {/* *NOTE: if you want to put props on Link in next.js you need to nest a anchor tag to do that */}
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}> &#8592; Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next &#8594;</a>
      </Link>
    </PaginationStyles>
  );
}
