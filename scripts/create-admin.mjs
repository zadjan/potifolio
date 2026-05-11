/**
 * Admin user creation script — run ONCE after Firebase is configured.
 *
 * Usage:
 *   node scripts/create-admin.mjs
 *
 * Requires .env.local to have real Firebase credentials.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Read .env.local manually (no dotenv needed)
function loadEnv() {
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
    const env = {}
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [key, ...rest] = trimmed.split('=')
      env[key.trim()] = rest.join('=').trim()
    }
    return env
  } catch {
    console.error('❌  .env.local topilmadi')
    process.exit(1)
  }
}

const env = loadEnv()

const FIREBASE_API_KEY = env['NEXT_PUBLIC_FIREBASE_API_KEY']
const ADMIN_EMAIL      = env['NEXT_PUBLIC_ADMIN_EMAIL'] ?? 'ikromovozod206@gmail.com'
const ADMIN_PASSWORD   = 'portifolio-ozodbek206'

if (!FIREBASE_API_KEY || FIREBASE_API_KEY === 'your_api_key') {
  console.error('❌  .env.local da NEXT_PUBLIC_FIREBASE_API_KEY to\'ldirilmagan!')
  console.error('   Firebase Console → Project Settings → Web App → Config')
  process.exit(1)
}

console.log(`\n🔐  Admin user yaratilmoqda...`)
console.log(`    Email:    ${ADMIN_EMAIL}`)
console.log(`    Password: ${'*'.repeat(ADMIN_PASSWORD.length)}\n`)

// Firebase Auth REST API — SDK shart emas
const res = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      returnSecureToken: true,
    }),
  }
)

const data = await res.json()

if (data.error) {
  const code = data.error.message
  if (code === 'EMAIL_EXISTS') {
    console.log('⚠️   Bu email allaqachon mavjud. Login qilish uchun:')
    console.log(`    http://localhost:3000/admin/login\n`)
  } else if (code === 'OPERATION_NOT_ALLOWED') {
    console.error('❌  Email/Password auth yoqilmagan!')
    console.error('   Firebase Console → Authentication → Sign-in method → Email/Password → Enable\n')
    process.exit(1)
  } else {
    console.error(`❌  Xato: ${code}\n`)
    process.exit(1)
  }
} else {
  console.log('✅  Admin user muvaffaqiyatli yaratildi!')
  console.log(`    UID:   ${data.localId}`)
  console.log(`    Email: ${data.email}`)
  console.log(`\n    Login sahifasi: http://localhost:3000/admin/login\n`)
}
