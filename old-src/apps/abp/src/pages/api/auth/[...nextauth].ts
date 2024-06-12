import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthOptions } from '../../../lib/authUtil';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authOptions = getAuthOptions(req);
    return NextAuth(req, res, authOptions);
}
