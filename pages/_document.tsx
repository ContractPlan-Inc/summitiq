import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="description" content="ContractPlan - Your command center for intelligent contract execution" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
