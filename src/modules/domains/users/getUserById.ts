import type { PrismaClient } from '@prisma/client'

export const getUserByID = async (prisma: PrismaClient, id: number) => {
  const existingUser = await prisma.user.findFirst({
    where: { id },
    select: {
      username: true,
      email: true,
      passhash: true,
      id: true,
      created_at: true
    }
  })

  if (!existingUser) {
    throw new Error('Invalid user')
  }

  return {
    username: existingUser.username,
    email: existingUser.email,
    id: existingUser.id,
    createdAt: existingUser.created_at
  }
}
