/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

// Import next.js router to hook into it to run nprogress animation based on events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * This is a special next.js file _app.js you can create in the pages folder for some global templates.
    This component will wrap all of our pages now. 
*/

// apollo is coming from wrapping the upper level with a withData wrapper
function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// next.js specific config for working with apollo
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  // pages will have getInitialProps on them added by `withData` wrapper
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // get query params in a url at a page level
  pageProps.query = ctx.query;
  return { pageProps };
};

// withData was created to use apollo boost packages with file upload capability - see file
export default withData(MyApp);
