import '@/styles/globals.css'
import { useApollo } from '@/server/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as v from 'valibot'

import '@valibot/i18n/pt'
import MainLayout from '@/components/layout/mainLayout'

// Set the language configuration globally
v.setGlobalConfig({ lang: 'pt' })

function MyApp({ Component, pageProps, router }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const isLoginPage = router.pathname === '/login'

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>TcheTask</title>
        <meta name="description" content="A Test Application" />
        <link rel="icon" href="/favicon2.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </ApolloProvider>
  )
}

export default MyApp
