import {NextRequest,NextResponse} from 'next/server'

export function proxy(request:NextRequest){
  const response=NextResponse.next()
  if(request.nextUrl.hostname.endsWith('.vercel.app'))response.headers.set('X-Robots-Tag','noindex, nofollow')
  return response
}

export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']}
