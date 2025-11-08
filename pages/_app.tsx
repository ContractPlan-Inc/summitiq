import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { DemoProvider } from '../contexts/DemoContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DemoProvider>
      <Component {...pageProps} />
    </DemoProvider>
  )
}
