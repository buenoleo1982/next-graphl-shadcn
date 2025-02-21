/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
  from
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { parseCookies } from 'nookies'
import { useMemo } from 'react'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

type SchemaContext =
  | SchemaLink.ResolverContext
  | SchemaLink.ResolverContextFunction

function createIsomorphicLink(ctx?: SchemaContext) {
  if (typeof window === 'undefined') {
    const { schema } = require('../graphql/schema')
    return new SchemaLink({
      schema,
      context: ctx
    })
  }
  const cookies = parseCookies()
  const token = cookies.sid

  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const subdomain = hostname.split('.')[0]
  console.warn('subdomain', subdomain)

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      datasource: subdomain !== 'localhost' ? subdomain : ''
    }
  })
  return from([httpLink])
}

function createApolloClient(ctx?: SchemaContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(ctx || undefined),
    cache: new InMemoryCache()
  })
}

interface InitApollo {
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  initialState?: any
  ctx?: SchemaContext
}

export function initializeApollo({ ctx, initialState }: InitApollo) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx || undefined)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  pageProps: { props: any }
) {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()

  return pageProps
}

// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  )
  return store
}
