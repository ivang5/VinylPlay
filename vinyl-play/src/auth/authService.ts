import { generateCodeVerifier, generateCodeChallenge } from "./pkceUtils";
import { tokenStorage } from "./tokenStorage";

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URL;
const scope = import.meta.env.VITE_SCOPE;
const authEndpoint = import.meta.env.VITE_AUTHORIZATION_ENDPOINT;
const tokenEndpoint = import.meta.env.VITE_TOKEN_ENDPOINT;

export const redirectToSpotifyAuthorize = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  tokenStorage.saveCodeVerifier(codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location.href = `${authEndpoint}?${params.toString()}`;
};

export const exchangeToken = async (code: string) => {
  const verifier = tokenStorage.codeVerifier;
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier || "",
    }),
  });

  return await response.json();
};

export const refreshAccessToken = async () => {
  const refreshToken = tokenStorage.refreshToken;
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return await response.json();
};
