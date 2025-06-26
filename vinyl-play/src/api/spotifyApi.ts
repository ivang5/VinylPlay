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
  headers?: object,
  body?: object
) => {
  const token = await ensureValidAccessToken();

  const res = await fetch(`${import.meta.env.VITE_SPOTIFY_API}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Spotify API error ${res.status}: ${error}`);
  }

  if (res.status === 204) {
    return null;
  }

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

export const transferPlaybackToDevice = async (device_id: string) => {
  return await fetchWebApi(
    "v1/me/player",
    "PUT",
    { "Content-Type": "application/json" },
    {
      device_ids: [device_id],
      play: true,
    }
  );
};
