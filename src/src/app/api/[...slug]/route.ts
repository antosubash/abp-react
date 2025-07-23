import { getSession } from '@/lib/actions'
import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL

if (!EXTERNAL_API_URL) {
  console.error('NEXT_PUBLIC_API_URL environment variable is not set')
  throw new Error('API URL not configured')
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiError extends Error {
  status?: number
}

const getHeaders = async (): Promise<HeadersInit> => {
  const session = await getSession()

  const headers = new Headers()

  headers.set('Authorization', `Bearer ${session.access_token}`)
  headers.set('Content-Type', 'application/json')
  headers.set('__tenant', session.tenantId ?? '')

  console.log('Request headers prepared:', {
    authorization: 'Bearer [REDACTED]',
    contentType: 'application/json',
    tenant: session.tenantId || 'none',
  })

  return headers
}

const makeApiRequest = async (
  request: NextRequest,
  method: RequestMethod,
  includeBody = false
): Promise<Response> => {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substring(7)

  try {
    const path = request.nextUrl.pathname
    const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`

    console.log(`[${requestId}] Starting ${method} request:`, {
      method,
      path,
      fullUrl: url,
      includeBody,
      timestamp: new Date().toISOString(),
    })

    const headers = await getHeaders()

    const options: RequestInit = {
      method,
      headers,
      ...(includeBody && {
        body: request.body,
        duplex: 'half',
      }),
      cache: 'no-store',
    }

    console.log(`[${requestId}] Request options:`, {
      method: options.method,
      hasBody: !!options.body,
      cache: options.cache,
      headersCount: Object.keys(headers).length,
    })

    // Add timeout and better error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let response: Response
    try {
      console.log(`[${requestId}] Making fetch request to external API...`)
      response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const duration = Date.now() - startTime
      console.log(`[${requestId}] Response received:`, {
        status: response.status,
        statusText: response.statusText,
        duration: `${duration}ms`,
        headers: Object.fromEntries(response.headers.entries()),
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      const duration = Date.now() - startTime
      console.error(`[${requestId}] Fetch error:`, {
        error: fetchError,
        cause: (fetchError as any)?.cause,
        url,
        method,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      })
      throw fetchError
    }

    if (!response.ok) {
      const errorData = await response
        .clone()
        .json()
        .catch(() => null)
      console.error(`[${requestId}] API request failed:`, {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url,
        method,
        duration: `${Date.now() - startTime}ms`,
      })
      throw Object.assign(
        new Error(errorData?.error || `API request failed with status ${response.status}`),
        { status: response.status }
      )
    }

    // Forward the response with original headers
    const responseHeaders = new Headers(response.headers)
    const data = await response.json().catch(() => response)

    const duration = Date.now() - startTime
    console.log(`[${requestId}] Request completed successfully:`, {
      status: response.status,
      responseSize: JSON.stringify(data).length,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    const apiError = error as ApiError
    const duration = Date.now() - startTime
    console.error(`[${requestId}] API request error:`, {
      error: apiError.message,
      status: apiError.status,
      stack: apiError.stack,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json({ error: apiError.message }, { status: apiError.status || 500 })
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  console.log('GET request received:', {
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: Object.fromEntries(request.headers.entries()),
  })
  return makeApiRequest(request, 'GET')
}

export async function POST(request: NextRequest): Promise<Response> {
  console.log('POST request received:', {
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: Object.fromEntries(request.headers.entries()),
  })
  return makeApiRequest(request, 'POST', true)
}

export async function PUT(request: NextRequest): Promise<Response> {
  console.log('PUT request received:', {
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: Object.fromEntries(request.headers.entries()),
  })
  return makeApiRequest(request, 'PUT', true)
}

export async function DELETE(request: NextRequest): Promise<Response> {
  console.log('DELETE request received:', {
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: Object.fromEntries(request.headers.entries()),
  })
  return makeApiRequest(request, 'DELETE')
}
