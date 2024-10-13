import { execSync } from 'node:child_process'

function runPrisma(command: string, schema: string) {
  const env = {
    ...process.env,
    DATABASE_URL: `${process.env.DATABASE_URL}?schema=${schema}`
  }
  try {
    console.log(
      `Running Prisma ${command} for schema ${schema}`,
      env.DATABASE_URL
    )
    execSync(`npx prisma ${command}`, {
      stdio: 'inherit',
      env
    })
    // biome-ignore lint/correctness/noUnreachable: <explanation>
  } catch (error) {
    console.error(`Error running command for schema ${schema}: ${error}`)
  }
}

function manageMigrations(command: string) {
  const schemas = process.env.PRISMA_SCHEMAS?.split(',')
  if (schemas) {
    for (let i = 0; i < schemas.length; i++) {
      const schema = schemas[i]
      runPrisma(command, schema)
    }
  } else {
    console.error('No schemas defined in PRISMA_SCHEMAS environment variable')
  }
}

const command: string = process.argv[2]
if (!command) {
  console.error(
    'Please provide a command: migrate, generate, introspect, or migrate dev.'
  )
  process.exit(1)
}

manageMigrations(command)
