import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkBotId } from 'botid/server'

export async function middleware(request: NextRequest) {
  // Check BotID for protected routes
  const verification = await checkBotId(request)

  // If BotID detects a bot, block the request
  if (verification.isBot) {
    return new NextResponse('Access denied', { status: 403 })
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - protect these separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
