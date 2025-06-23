import { refreshAccessToken } from "../auth/authService";
import { isTokenExpired, tokenStorage } from "../auth/tokenStorage";

const ensureValidAccessToken = async (): Promise<string> => {
  if (isTokenExpired()) {
    const newToken = await refreshAccessToken();

    if (newToken.access_token) {
      tokenStorage.save(newToken);
    } else {
      throw new Error("Failed to refresh access token");
    }
  }

  return tokenStorage.accessToken!;
};

export const fetchWebApi = async (
  endpoint: string,
  method?: string,
  body?: JSON
) => {
  const token = await ensureValidAccessToken();

  const res = await fetch(`${import.meta.env.VITE_SPOTIFY_API}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getUserProfile = async () => {
  return await fetchWebApi("v1/me");
};

export const getTopTracks = async () => {
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
  ).items;
};
