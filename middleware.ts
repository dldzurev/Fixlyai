// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')
  const user = 'fixly'
  const pass = 'secure123'

  if (basicAuth) {
    const [, encoded] = basicAuth.split(' ')
    const decoded = Buffer.from(encoded, 'base64').toString()
    const [u, p] = decoded.split(':')

    if (u === user && p === pass) {
      return NextResponse.next()
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  })
}

export const config = {
  matcher: ['/:path*'],
}