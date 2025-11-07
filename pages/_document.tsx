import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="description" content="SummitIQ - AI-Powered Meeting Assistant for Sales Professionals. Turn every meeting into revenue with real-time transcription, AI coaching, and automated follow-ups." />
        <meta name="keywords" content="meeting assistant, sales AI, transcription, meeting intelligence, sales coaching, CRM integration" />
        <meta property="og:title" content="SummitIQ - AI-Powered Meeting Assistant" />
        <meta property="og:description" content="Transform your sales meetings with real-time AI coaching and intelligent insights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SummitIQ - AI-Powered Meeting Assistant" />
        <meta name="twitter:description" content="Turn every meeting into revenue" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
