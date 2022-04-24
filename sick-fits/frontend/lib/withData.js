import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

/**
 *
 * Required for supporting image upload with Apollo Client.
 * This is a secondary link that is not included with Apollo-Boost package, so in order to support image uploads,
 * we need to eject from Apollo Boost and add this boilerplate code.
 *
 * This export is a withData wrapper we use in _app.js to inject the apollo data to apollo provider
 */

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      // error handling link - useful to log out graphql or network errors for debugging.
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // createUploadLink is built ontop of popular http link and it adds file upload handling
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers, // sends cookies and login info for user to prevent flicker on refresh.
        // *** Our JWT is in a cookie instead of local storage so it can be sent to the server so it renders back the logged in user pages
      }),
    ]),
    // im memory storage is in the browser in this case
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // we want to handle caching here ourselves for deleting items
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}), // restore state back to client on refreshes if it exists
  });
}

// this will crawl all queries and make sure all are resolved and fetched before sending back data to client for rendering from server
export default withApollo(createClient, { getDataFromTree });
