import { IncomingMessage } from 'http';

export const getCookieWithName = (name: string, cookieString: string) => {
    const cookieArray = cookieString.split(';');
    const cookie = cookieArray.find((x) => x.includes(name));
    if (!cookie) return null;
    const value = cookie.split('=')[1];
    return decodeURIComponent(value);
};

export const getCookieFromMiddleware = (name: string, req: any) => {
    const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
        (key) => key.toString() === 'Symbol(NextRequestMeta)'
    ) as string;
    if (!NextRequestMetaSymbol) {
        return null;
    }
    const NextRequestMeta = req[NextRequestMetaSymbol];
    const cookieString = NextRequestMeta._nextMiddlewareCookie
        ?.toString()
        .replace('Path=/', '');
    const cookieArray = cookieString?.split(';');
    const cookie = cookieArray?.find((x: string | string[]) =>
        x.includes(name)
    );
    const value = cookie?.split('=')[1];
    return decodeURIComponent(value?.trim());
};

export const getCookieFromRequest = (name: string, req: IncomingMessage) => {
    const cookieString = req.headers.cookie as string;
    const cookieArray = cookieString?.split(';');
    const cookie = cookieArray?.find((x) => x.includes(name));
    if (!cookie) {
        console.log('cookie not found in the headers, trying the middleware');
        return getCookieFromMiddleware(name, req);
    }
    const value = cookie?.split('=')[1];
    return decodeURIComponent(value?.trim());
};
