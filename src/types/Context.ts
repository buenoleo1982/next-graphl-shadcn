import type { IncomingMessage, ServerResponse } from 'node:http'

import type { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextApiRequestCookies } from 'next/dist/server/api-utils'

export interface Context {
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies
      })
  res: NextApiResponse | ServerResponse
  prisma: PrismaClient
  user?: {
    id: number
  }
}
