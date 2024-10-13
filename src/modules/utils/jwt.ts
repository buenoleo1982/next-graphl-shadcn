import jwt, { type JwtPayload } from 'jsonwebtoken'

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is not defined! (ignore if typegen)')
}

export const createToken = (
  paylod: string | Buffer | object,
  options: jwt.SignOptions
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      paylod,
      process.env.JWT_SECRET as string,
      options,
      (err, encoded) => {
        if (err) {
          return reject(err)
        }
        return resolve(encoded as string)
      }
    )
  })
}

export const verifyToken = (token: string) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      return resolve(decoded as JwtPayload)
    })
  })
}
