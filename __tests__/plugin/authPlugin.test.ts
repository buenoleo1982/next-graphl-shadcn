/* eslint-disable @typescript-eslint/no-explicit-any */
import { core } from 'nexus'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { AuthPlugin } from '../../src/modules/graphql/types/plugins/authPlugin'

describe('AuthPlugin', () => {
  let mockConfig: unknown
  let mockNext: Mock
  let mockContext: Record<string, any>

  beforeEach(() => {
    mockConfig = {
      fieldConfig: {
        extensions: {}
      } as core.NexusOutputFieldConfig<any, any>,
      builder: {} as any,
      parentTypeConfig: {} as any,
      schemaConfig: {} as any,
      schemaExtension: {} as any
    }
    mockNext = vi.fn()
    mockContext = {}
  })

  it('should have the correct structure', () => {
    expect(AuthPlugin).toHaveProperty('config')
    expect(AuthPlugin.config).toHaveProperty('name', 'AuthPlugin')
    expect(AuthPlugin.config).toHaveProperty('description')
    expect(AuthPlugin.config).toHaveProperty('onCreateFieldResolver')
    expect(typeof AuthPlugin.config.onCreateFieldResolver).toBe('function')
  })

  it('should allow access to non-protected fields', async () => {
    const onCreateFieldResolver = AuthPlugin.config.onCreateFieldResolver
    if (!onCreateFieldResolver) {
      throw new Error('onCreateFieldResolver is undefined')
    }

    const middlewareFn = onCreateFieldResolver(
      mockConfig as core.CreateFieldResolverInfo<any, any>
    )
    if (!middlewareFn) {
      throw new Error('middlewareFn is undefined')
    }

    const result = await middlewareFn(
      null,
      {},
      mockContext,
      {} as any,
      mockNext
    )

    expect(mockNext).toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
