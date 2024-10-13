import type { NextApiRequest, NextApiResponse } from 'next'

import { server } from '../../server/lib/apolloServer'
import { cors } from '../../server/middleware/cors'

export const config = {
  api: {
    bodyParser: false
  }
}

const serverStart = server.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res)
  // schema-wide middleware

  await serverStart
  await server.createHandler({ path: '/api/graphql' })(req, res)
  return
}
