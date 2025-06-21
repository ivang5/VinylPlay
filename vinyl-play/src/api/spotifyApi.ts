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

export const getUserProfile = async () => {
  const token = await ensureValidAccessToken();

  const res = await fetch(`${import.meta.env.VITE_SPOTIFY_API}/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user data");

  return res.json();
};
