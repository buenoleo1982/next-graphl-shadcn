import { gql } from '@apollo/client'
import { describe, expect, it } from 'vitest'

import { server } from '../../src/lib/apolloServer'

describe('Auth check', () => {
  it('should validate user info correctly', async () => {
    const result = await server.executeOperation({
      query: gql`
        mutation {
          login(credentials: { username: "test", password: "123456" }) {
            username
          }
        }
      `
    })

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('data')
    expect(result.errors).toBeTruthy()
  })
})
