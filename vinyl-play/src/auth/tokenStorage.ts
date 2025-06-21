const ACCESS = "access_token";
const REFRESH = "refresh_token";
const EXPIRES_IN = "expires_in";
const EXPIRES = "expires";
const CODE_VERIFIER = "code_verifier";

export const tokenStorage = {
  get accessToken() {
    return localStorage.getItem(ACCESS);
  },
  get refreshToken() {
    return localStorage.getItem(REFRESH);
  },
  get expiresIn() {
    return localStorage.getItem(EXPIRES_IN);
  },
  get expires() {
    return localStorage.getItem(EXPIRES);
  },
  get codeVerifier() {
    return localStorage.getItem(CODE_VERIFIER);
  },

  save(response: any) {
    const { access_token, refresh_token, expires_in } = response;
    if (!access_token || !expires_in) {
      console.error("Invalid token response:", response);
      return;
    }

    const expiryTimeMs = Date.now() + Number(expires_in) * 1000;
    const expiryDate = new Date(expiryTimeMs);

    if (isNaN(expiryDate.getTime())) {
      console.error("Invalid expiry date from expires_in:", expires_in);
      return;
    }

    localStorage.setItem(ACCESS, access_token);
    if (refresh_token) {
      localStorage.setItem(REFRESH, refresh_token);
    }
    localStorage.setItem(EXPIRES_IN, String(expires_in));
    localStorage.setItem(EXPIRES, expiryDate.toISOString());
  },

  saveCodeVerifier(verifier: string) {
    localStorage.setItem(CODE_VERIFIER, verifier);
  },

  clear() {
    [ACCESS, REFRESH, EXPIRES_IN, EXPIRES, CODE_VERIFIER].forEach((k) =>
      localStorage.removeItem(k)
    );
  },
};

export const isTokenExpired = (): boolean => {
  const expiry = tokenStorage.expires;
  if (!expiry) return true;

  const expiryDate = new Date(expiry);
  const now = new Date();

  return now >= expiryDate;
};
