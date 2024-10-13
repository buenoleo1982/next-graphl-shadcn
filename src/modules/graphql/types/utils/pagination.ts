import { objectType } from 'nexus'

export const Pagination = objectType({
  name: 'Pagination',
  definition: t => {
    t.nonNull.int('totalCount')
    t.nonNull.int('page')
    t.nonNull.int('pageSize')
    t.nonNull.boolean('hasMore')
  }
})
