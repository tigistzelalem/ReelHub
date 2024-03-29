import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Head>
        {/* Include the Razorpay script */}
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}