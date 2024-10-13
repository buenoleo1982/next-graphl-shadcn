import type { IncomingMessage } from 'node:http'

import type { NextApiRequest } from 'next'
import type { NextApiRequestCookies } from 'next/dist/server/api-utils'
import nookies from 'nookies'

import { verifyToken } from './jwt'

export const isAuth = async (
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies
      })
) => {
  const cookies = nookies.get({ req })
  if (!cookies.ssid) {
    throw new Error('Not authenticated')
  }
  const decodeJWT = await verifyToken(cookies.ssid)
  if (!decodeJWT.username) {
    throw new Error('Not authenticated')
  }

  return decodeJWT
}
