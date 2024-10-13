import type { FieldResolver } from 'nexus'
import nookies from 'nookies'

import type { DecodedJWT } from '../../../types'
import { verifyToken } from '../../utils/jwt'

export const implicitLogin: FieldResolver<'Query', 'implicitLogin'> = async (
  _,
  ___,
  { req }
) => {
  try {
    const cookies = nookies.get({ req })
    const token = cookies.sid || null
    if (!token) {
      throw new Error('No token found')
    }
    const decodedToken = await verifyToken(token)
    return {
      username: (decodedToken as DecodedJWT).username,
      loggedIn: true
    }
  } catch (error) {
    console.error(error)
    return {
      loggedIn: false
    }
  }
}
