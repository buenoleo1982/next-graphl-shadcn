import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../lib/prisma'
import { getRedisClient } from '../../lib/redis'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.id !== 'POST') {
    const redisResult = await getRedisClient()
      .multi()
      .hgetall(req.query.id as string)
      .del(req.query.id as string)
      .exec()

    if (redisResult) {
      await handleRedisQuery(redisResult)
    }
  }
  res.redirect(process.env.SERVER_URL || 'http://localhost:3000')
}

export default handler

const handleRedisQuery = async (
  redisResult: [error: Error | null, result: unknown][]
) => {
  if (redisResult[0][0]) {
    throw redisResult[0][0]
  }
  const cachedAccount = redisResult[0][1] as {
    username: string
    email: string
    hashedPass: string
  }

  if (
    !cachedAccount.email ||
    !cachedAccount.username ||
    !cachedAccount.hashedPass
  ) {
    return
  }

  await prisma.user.create({
    data: {
      username: cachedAccount.username,
      email: cachedAccount.email,
      passhash: cachedAccount.hashedPass
    }
  })
}
