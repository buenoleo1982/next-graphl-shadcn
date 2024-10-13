import type { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

import {
  ImplicitLoginDocument,
  type ImplicitLoginQuery
} from '@/generated/graphql'
import { initializeApollo } from '@/server/lib/apolloClient'
import { prisma } from '@/server/lib/prisma'

interface Props {
  username?: string
  loggedIn: boolean
}

const Home = ({ username, loggedIn }: Props) => {
  if (!loggedIn) {
    return null
  }
  return <div>Hello {username}</div>
}

export const getServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req })
  if (!cookies.sid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const apolloClient = initializeApollo({ ctx: { req, res, prisma } })
  const { data } = await apolloClient.query<ImplicitLoginQuery>({
    query: ImplicitLoginDocument
  })
  console.log('Logged in?', data?.implicitLogin?.loggedIn)

  if (!data?.implicitLogin?.loggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      username: data?.implicitLogin?.username,
      loggedIn: data?.implicitLogin?.loggedIn
    } as Props
  }
}

export default Home
