import { IncomingMessage } from "http";

export const getCookieWithName = (name: string, cookieString: string) => {
  var cookieArray = cookieString.split(";");
  var cookie = cookieArray.find((x) => x.includes(name));
  if (!cookie) return null;
  var value = cookie.split("=")[1];
  return decodeURIComponent(value);
};

export const getCookieFromMiddleware = (name: string, req: any) => {
  const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
    (key) => key.toString() === "Symbol(NextRequestMeta)"
  ) as string;
  if (!NextRequestMetaSymbol) {
    return null;
  }
  const NextRequestMeta = req[NextRequestMetaSymbol];
  var cookieString = NextRequestMeta._nextMiddlewareCookie
    .toString()
    .replace("Path=/", "");
  var cookieArray = cookieString.split(";");
  var cookie = cookieArray.find((x: string | string[]) => x.includes(name));
  var value = cookie?.split("=")[1];
  return decodeURIComponent(value.trim());
};

export const getCookieFromRequest = (name: string, req: IncomingMessage) => {
  var cookieString = req.headers.cookie as string;
  var cookieArray = cookieString?.split(";");
  var cookie = cookieArray?.find((x) => x.includes(name));
  if(!cookie) {
    console.log("cookie not found in the headers, trying the middleware");
    return getCookieFromMiddleware(name, req);
  }
  var value = cookie?.split("=")[1];
  return decodeURIComponent(value?.trim());
};
