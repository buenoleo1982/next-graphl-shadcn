import type jwt from 'jsonwebtoken'

export type DecodedJWT = jwt.JwtPayload & {
  username: string
}
