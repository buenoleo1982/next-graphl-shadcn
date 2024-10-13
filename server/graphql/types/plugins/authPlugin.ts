/* eslint-disable @typescript-eslint/no-explicit-any */
import { plugin } from 'nexus'

import { Context } from '../../../../types/Context'

export const AuthPlugin = plugin({
  name: 'AuthPlugin',
  description:
    'Plugin to check authentication on protected queries and mutations',
  onCreateFieldResolver(config) {
    return async (root, args, ctx: Context, info, next) => {
      const extensions = config.fieldConfig.extensions ?? {}
      const isProtected =
        'protectedOperation' in extensions
          ? (extensions as { protectedOperation?: boolean }).protectedOperation
          : false

      if (isProtected && !ctx.user) {
        throw new Error('Not authenticated')
      }

      return next(root, args, ctx, info)
    }
  }
})
