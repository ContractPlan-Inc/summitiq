import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* SEO */}
        <meta name="description" content="SummitIQ - AI-Powered Meeting Assistant for Sales Professionals. Turn every meeting into revenue with real-time transcription, AI coaching, and automated follow-ups." />
        <meta name="keywords" content="meeting assistant, sales AI, transcription, meeting intelligence, sales coaching, CRM integration" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="SummitIQ - AI-Powered Meeting Assistant" />
        <meta property="og:description" content="Transform your sales meetings with real-time AI coaching and intelligent insights" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://summitiq.ai" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SummitIQ - AI-Powered Meeting Assistant" />
        <meta name="twitter:description" content="Turn every meeting into revenue" />

        {/* Performance Hints */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
