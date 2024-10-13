import type { FieldResolver } from 'nexus'
import nookies from 'nookies'

import { getExistingUser } from '../../domains/users/getExistingUser'
import { createToken } from '../../utils/jwt'
import { loginValidation } from '../../utils/registrationValidation'

export const loginAttemp: FieldResolver<'Mutation', 'login'> = async (
  _,
  { credentials },
  { res, prisma }
) => {
  await loginValidation.validate(credentials)
  const existingUser = await getExistingUser(prisma, credentials)
  const encodedToken = await createToken(
    {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email
    },
    {
      expiresIn: '60m'
    }
  )

  nookies.set({ res }, 'sid', encodedToken, {
    httpOnly: true,
    domain: process.env.SERVER_DOMAIN || undefined,
    maxAge: 60 * 5,
    sameSite: true,
    path: '/'
  })

  return {
    username: credentials.username,
    email: existingUser.email,
    id: existingUser.id,
    token: encodedToken
  }
}
