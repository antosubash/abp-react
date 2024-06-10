import { getSession } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
    const session = await getSession();
    const path = request.nextUrl.pathname;
    const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

    console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);

    try {
        return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        });;
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    // reroute the request to the API
    const res = new NextResponse();
    const session = await getSession();
    const path = request.nextUrl.pathname.replace("/api/", "");
    const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

    return await fetch(`${EXTERNAL_API_URL}/${path}${request.nextUrl.search}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
        },
        body: request.body,
    });
}