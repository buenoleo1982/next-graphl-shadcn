import { gql } from '@apollo/client'
import { describe, expect, it } from 'vitest'

import { server } from '../src/lib/apolloServer'

describe('Health check', () => {
  it('should return 200', async () => {
    const result = await server.executeOperation({
      query: gql`
        query {
          test(bool: true)
        }
      `
    })
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('data')
    expect(result.errors).toBeFalsy()
    expect(result.data).toEqual({ test: true })
  })
})
