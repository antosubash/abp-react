import { getSession } from '@/lib/session-utils';
import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
    const session = await getSession();
    const path = request.nextUrl.pathname;
    console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);
    try {
        return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.access_token}`,
                "__tenant": session.tenantId === 'default' ? undefined : session.tenantId
            }  as any,
        });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getSession();
    const path = request.nextUrl.pathname;
    console.log(`POST: ${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);
    return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            "__tenant": session.tenantId === 'default' ? undefined : session.tenantId
        } as any,
        body: request.body,
        duplex: "half"
    } as any);
}

export async function PUT(request: NextRequest) {
    const session = await getSession();
    const path = request.nextUrl.pathname;
    console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);
    return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            "__tenant": session.tenantId === 'default' ? undefined : session.tenantId
        } as any,
        body: request.body,
        duplex: "half"
    } as any);
}

export async function DELETE(request: NextRequest) {
    // reroute the request to the API
    const session = await getSession();
    const path = request.nextUrl.pathname;
    const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`;
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            "__tenant": session.tenantId === 'default' ? undefined : session.tenantId
        } as any,
    });
}