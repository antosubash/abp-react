import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const host = req.headers['host'];
    var protocol = req.headers['x-forwarded-proto'] || 'http';
    var currentUrl = `${protocol}://${host}`;
    try {
        const { id_token_hint } = req.query;
        if (!id_token_hint) return res.redirect('/');
        const endSessionUrl = new URL(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/connect/logout`
        );
        endSessionUrl.searchParams.set(
            'id_token_hint',
            id_token_hint as string
        );
        endSessionUrl.searchParams.set('post_logout_redirect_uri', currentUrl);
        res.redirect(endSessionUrl.toString());
    } catch (error) {
        res.redirect('/');
    }
}
