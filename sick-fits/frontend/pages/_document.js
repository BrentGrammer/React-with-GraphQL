import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * This is how we alter Html etc. in Next.js.  _document.js is another special file you can create.
 * We reference the imports and write boilerplate for custom html in index.html
 * You need to restart the dev server with npm run dev after doing this the first time
 */

export default class MyDocument extends Document {
  // this will wait until resolution before sending data from server to browser
  static getInitialProps({ renderPage }) {
    // NOTE: if you do this and still get warnings about mismatching props in the console, then delete the .next folder - it is a caching issue.
    // this is to prevent flicker and errors when next.js renders in browser since styled components has random ids that do not match what's sent from server
    // This takes styles rendered from frontend to account for that and prevents flicker.
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
