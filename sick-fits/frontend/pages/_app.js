import Page from '../components/Page';

/**
 * This is a special next.js file _app.js you can create in the pages folder for some global templates.
    This component will wrap all of our pages now. 
*/

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
