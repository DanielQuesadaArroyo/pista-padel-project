import { execFileSync, spawnSync } from 'node:child_process'
import { createHmac } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readTestEnvironment() {
  return Object.fromEntries(
    readFileSync('.env.test', 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=')
        return [line.slice(0, separator), line.slice(separator + 1)]
      }),
  )
}

function createLocalServiceRoleKey() {
  const containers = JSON.parse(
    execFileSync('docker', ['inspect', 'supabase_auth_pista-padel-project'], { encoding: 'utf8' }),
  )
  const jwtSecretEntry = containers[0].Config.Env.find((entry) =>
    entry.startsWith('GOTRUE_JWT_SECRET='),
  )

  if (!jwtSecretEntry)
    throw new Error('No se ha encontrado la clave JWT del contenedor local de Supabase.')

  const jwtSecret = jwtSecretEntry.split('=', 2)[1]
  const now = Math.floor(Date.now() / 1000)
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
  const header = encode({ alg: 'HS256', typ: 'JWT' })
  const payload = encode({ role: 'service_role', iss: 'supabase-demo', iat: now, exp: now + 300 })
  const signature = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${signature}`
}

const environment = readTestEnvironment()
let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? environment.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  try {
    serviceRoleKey = createLocalServiceRoleKey()
  } catch {
    throw new Error('No se puede acceder a Docker. Añade SUPABASE_SERVICE_ROLE_KEY a .env.test o concede acceso al usuario a Docker.')
  }
}
const vitestPath = resolve('node_modules', 'vitest', 'vitest.mjs')
const result = spawnSync(
  process.execPath,
  [vitestPath, 'run', 'tests/integration', '--no-file-parallelism'],
  {
    env: { ...process.env, RUN_INTEGRATION_TESTS: 'true', SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey },
    stdio: 'inherit',
  },
)

if (result.error) throw result.error
process.exit(result.status ?? 1)
