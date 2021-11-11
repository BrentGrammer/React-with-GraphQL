import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

// Import next.js router to hook into it to run nprogress animation based on events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
