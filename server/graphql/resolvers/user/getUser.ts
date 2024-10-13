import type { FieldResolver } from 'nexus'

import { getUserByID } from '../../../domains/users/getUserById'

export const getUser: FieldResolver<'Query', 'getUser'> = async (
  _,
  { id },
  { prisma }
) => {
  return await getUserByID(prisma, id as number)
}
