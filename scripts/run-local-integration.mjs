import { execFileSync, spawnSync } from 'node:child_process'
import { createHmac } from 'node:crypto'
import { resolve } from 'node:path'

const containerName = 'supabase_auth_pista-padel-project'
const containers = JSON.parse(execFileSync('docker', ['inspect', containerName], { encoding: 'utf8' }))
const jwtSecretEntry = containers[0].Config.Env.find((entry) => entry.startsWith('GOTRUE_JWT_SECRET='))

if (!jwtSecretEntry) throw new Error('No se ha encontrado la clave JWT del contenedor local de Supabase.')

const jwtSecret = jwtSecretEntry.split('=', 2)[1]
const now = Math.floor(Date.now() / 1000)
const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
const header = encode({ alg: 'HS256', typ: 'JWT' })
const payload = encode({ role: 'service_role', iss: 'supabase-demo', iat: now, exp: now + 300 })
const signature = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest('base64url')
const serviceRoleKey = `${header}.${payload}.${signature}`
const vitestPath = resolve('node_modules', 'vitest', 'vitest.mjs')
const result = spawnSync(process.execPath, [vitestPath, 'run', 'tests/integration', '--no-file-parallelism'], {
  env: { ...process.env, SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey },
  stdio: 'inherit',
})

if (result.error) throw result.error
process.exit(result.status ?? 1)
