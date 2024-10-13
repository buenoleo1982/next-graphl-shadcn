import { arg, extendType, inputObjectType, objectType } from 'nexus'

import { getUser } from '../../resolvers/user/getUser'
import { getUsers } from '../../resolvers/user/getUsers'
import { DateScalar } from '../../scalars/dateScalar'
import { PageArgs } from '../utils/pageArgs'
import { Pagination } from '../utils/pagination'

export const GetUser = extendType({
  type: 'Query',
  definition: t => {
    t.field('getUser', {
      type: UserResponse,
      args: { id: 'Int' },
      resolve: getUser,
      extensions: {
        protectedOperation: true // Isso será checado no plugin
      }
    })
  }
})

export const GetUsers = extendType({
  type: 'Query',
  definition: t => {
    t.field('getUsers', {
      type: UserList,
      args: {
        userArgs: arg({ type: UserArgs }),
        pageArgs: arg({ type: PageArgs })
      },
      resolve: getUsers
    })
  }
})

export const UserArgs = inputObjectType({
  name: 'UserArgs',
  definition: t => {
    t.int('id')
    t.string('username')
    t.string('email')
  }
})

export const UserList = objectType({
  name: 'UserList',
  definition: t => {
    t.list.nonNull.field('nodes', { type: UserResponse })
    t.nonNull.field('pagination', { type: Pagination })
  }
})

export const UserResponse = objectType({
  name: 'UserResponse',
  definition: t => {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: DateScalar })
  }
})
