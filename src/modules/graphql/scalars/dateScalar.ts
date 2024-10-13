import { scalarType } from 'nexus'

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value: unknown) {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value) // value from the client
    }
    throw new Error('Invalid date value')
  },
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  }
})
