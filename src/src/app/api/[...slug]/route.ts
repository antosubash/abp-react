import { getSession } from '@/lib/actions'
import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Handles GET requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API or an error response.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const session = await getSession()
  console.log('GET')
  const path = request.nextUrl.pathname
  console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`)
  try {
    return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        __tenant: session.tenantId === 'default' ? undefined : session.tenantId,
      } as any,
    })
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
}

/**
 * Handles POST requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function POST(request: NextRequest) {
  const session = await getSession()
  const path = request.nextUrl.pathname
  console.log(`POST: ${EXTERNAL_API_URL}${path}${request.nextUrl.search}`)
  return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      __tenant: session.tenantId === 'default' ? undefined : session.tenantId,
    } as any,
    body: request.body,
    duplex: 'half',
  } as any)
}

/**
 * Handles PUT requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function PUT(request: NextRequest) {
  const session = await getSession()
  const path = request.nextUrl.pathname
  console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`)
  return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      __tenant: session.tenantId === 'default' ? undefined : session.tenantId,
    } as any,
    body: request.body,
    duplex: 'half',
  } as any)
}

/**
 * Handles DELETE requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function DELETE(request: NextRequest) {
  const session = await getSession()
  const path = request.nextUrl.pathname
  const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      __tenant: session.tenantId === 'default' ? undefined : session.tenantId,
    } as any,
  })
}