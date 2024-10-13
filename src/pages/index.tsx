import { Heading } from '@chakra-ui/react'
import type { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

import {
  ImplicitLoginDocument,
  type ImplicitLoginQuery
} from '../../generated/graphql'
import { initializeApollo } from '../lib/apolloClient'
import { prisma } from '../lib/prisma'
import LoginPage from './login'

interface Props {
  username?: string
  loggedIn: boolean
}

const Home = ({ username, loggedIn }: Props) => {
  return loggedIn ? <Heading>Hello {username}</Heading> : <LoginPage />
}

export const getServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req })
  if (!cookies.sid) {
    return {
      props: { loggedIn: false } as Props
    }
  }

  const apolloClient = initializeApollo({ ctx: { req, res, prisma } })
  const { data } = await apolloClient.query<ImplicitLoginQuery>({
    query: ImplicitLoginDocument
  })
  console.log('Logged in?', data?.implicitLogin?.loggedIn)

  if (!data?.implicitLogin?.loggedIn) {
    return {
      props: {
        loggedIn: false
      } as Props
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
