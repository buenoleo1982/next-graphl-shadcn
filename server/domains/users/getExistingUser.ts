import type { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

export const getExistingUser = async (
  prisma: PrismaClient,
  credentials: { username: string; password: string }
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: credentials.username }, { email: credentials.username }]
    },
    select: {
      username: true,
      email: true,
      passhash: true,
      id: true,
      created_at: true
    }
  })

  const passwordsMatch =
    (await compare(credentials.password, existingUser?.passhash as string)) ||
    ''

  if (!existingUser || !passwordsMatch) {
    throw new Error('Invalid credentials')
  }

  return {
    username: existingUser.username,
    email: existingUser.email,
    id: existingUser.id
  }
}
