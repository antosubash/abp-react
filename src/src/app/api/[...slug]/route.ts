import { getSession } from '@/lib/actions'
import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiError extends Error {
  status?: number;
}

const getHeaders = async (request: NextRequest, method: RequestMethod): Promise<HeadersInit> => {
  const session = await getSession()
  
  // Create a new headers object from the incoming request
  const headers = new Headers(request.headers)
  
  // Add or override specific headers
  headers.set('Authorization', `Bearer ${session.access_token}`)
  headers.set('Content-Type', 'application/json')
  headers.set('__tenant', session.tenantId ?? '')
  
  return headers
}

const makeApiRequest = async (
  request: NextRequest,
  method: RequestMethod,
  includeBody = false
): Promise<Response> => {
  try {
    const path = request.nextUrl.pathname
    const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`
    const headers = await getHeaders(request, method)

    const options: RequestInit = {
      method,
      headers,
      ...(includeBody && { body: request.body }),
      cache: 'no-store',
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.clone().json().catch(() => null)
      throw Object.assign(
        new Error(errorData?.error || `API request failed with status ${response.status}`),
        { status: response.status }
      )
    }

    // Forward the response with original headers
    const responseHeaders = new Headers(response.headers)
    const data = await response.json().catch(() => response)

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    const apiError = error as ApiError
    console.error('API request error:', apiError)
    return NextResponse.json(
      { error: apiError.message },
      { status: apiError.status || 500 }
    )
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  return makeApiRequest(request, 'GET')
}

export async function POST(request: NextRequest): Promise<Response> {
  return makeApiRequest(request, 'POST', true)
}

export async function PUT(request: NextRequest): Promise<Response> {
  return makeApiRequest(request, 'PUT', true)
}

export async function DELETE(request: NextRequest): Promise<Response> {
  return makeApiRequest(request, 'DELETE')
}