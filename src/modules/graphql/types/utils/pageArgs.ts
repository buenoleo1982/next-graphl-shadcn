import { inputObjectType } from 'nexus'

export const PageArgs = inputObjectType({
  name: 'PageArgs',
  definition: t => {
    t.nonNull.int('skip')
    t.nonNull.int('take')
  }
})
