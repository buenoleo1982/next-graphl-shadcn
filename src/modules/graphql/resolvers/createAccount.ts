import type { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import type { FieldResolver } from 'nexus'
import nodemailer from 'nodemailer'

import { getRedisClient } from '../../../lib/redis'
import { getTransport } from '../../mail/transport'
import { generateVerificationEmail } from '../../mail/verifyAccount'
import { registrationValidation } from '../../utils/registrationValidation'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { v4: uuidV4 } = require('uuid')

export const createAccount: FieldResolver<'Mutation', 'createAccount'> = async (
  _,
  { credentials },
  { prisma }
) => {
  await registrationValidation.validate(credentials)
  await verifyExistUser(prisma, credentials)

  const hashedPass = await hash(credentials.password, 7)
  const key = uuidV4()

  const userOjt = {
    username: credentials.username,
    email: credentials.email,
    hashedPass
  }

  await getRedisClient()
    .multi()
    .hmset(key, userOjt)
    .expire(key, 60 * 60 * 24)
    .exec()
  const mailOptions = {
    username: credentials.username,
    email: credentials.email,
    uuid: key
  }

  const transport = await getTransport()
  transport.sendMail(generateVerificationEmail(mailOptions)).then(info => {
    console.log(`Message id: ${info.messageId}`)
    console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
  })

  return {
    message:
      'Thanks for registering! Check your email for instructions on how to verify your account.'
  }
}

const verifyExistUser = async (
  prisma: PrismaClient,
  credentials: { email: string; username: string }
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: credentials.username,
      OR: [
        {
          email: credentials.email
        }
      ]
    }
  })
  if (existingUser !== null) {
    throw new Error('User or username already exists')
  }
}
