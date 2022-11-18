const DAYS_IN_MS = 8.64e7;

export function setToken(token: string) {
  document.cookie = `token=${token}; expires=${new Date(
    Date.now() + 60 * DAYS_IN_MS
  ).toUTCString()}; SameSite=None; Secure`;
}

export function getToken() {
  const cookie = document.cookie;
  const token = cookie.split("token=").at(1);
  return token;
}

export function getHeaders(headers: Record<string, string> = {}) {
  const token = getToken();
  return token
    ? {
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        accept: "application/json, text/plain, */*",
        Authorization: `Token ${token}`,
        "content-type": "application/json;charset=UTF-8",
        ...headers,
      }
    : {
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
        ...headers,
      };
}
