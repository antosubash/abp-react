import { getSession } from '@/lib/actions'
import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiError extends Error {
  status?: number;
}

const getHeaders = async (method: RequestMethod): Promise<HeadersInit> => {
  const session = await getSession()
  return {
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
    __tenant: session.tenantId ?? '',
  }
}

const makeApiRequest = async (
  request: NextRequest,
  method: RequestMethod,
  includeBody = false
): Promise<Response> => {
  try {
    const path = request.nextUrl.pathname
    const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`
    const headers = await getHeaders(method)

    const options: RequestInit = {
      method,
      headers,
      ...(includeBody && { body: request.body }),
      cache: 'no-store',
    }



    const response = await fetch(url, options)

    // Clone the response to handle streaming
    const clonedResponse = response.clone()

    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorData = await clonedResponse.json();
        errorMessage = errorData.error || `API request failed with status ${response.status}`;
      } catch {
        errorMessage = `API request failed with status ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    // Handle different content types
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await clonedResponse.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return response;
  } catch (error) {
    const apiError = error as ApiError;
    console.error('API request error:', apiError);
    return NextResponse.json(
      { error: apiError.message },
      { status: apiError.status || 500 }
    );
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