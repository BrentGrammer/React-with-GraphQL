import Document, { Html, Head, NextScript, Main } from 'next/document';

/**
 * This is how we alter Html etc. in Next.js.  _document.js is another special file you can create.
 * We reference the imports and write boilerplate for custom html in index.html
 * You need to restart the dev server with npm run dev after doing this the first time
 */

export default class MyDocument extends Document {
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
