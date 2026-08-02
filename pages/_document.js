import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Runs before first paint, so a visitor who chose dark never sees a white
 * flash while React hydrates.
 */
const themeScript = `(function(){try{
  var stored = localStorage.getItem('theme');
  var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) document.documentElement.classList.add('dark');
}catch(e){}})();`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b1733" />
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
