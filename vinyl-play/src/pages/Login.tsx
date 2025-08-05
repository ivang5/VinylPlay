import { redirectToSpotifyAuthorize } from "../auth/authService";

export const Login = () => {
  return (
    <button
      className="px-3 py-1 bg-blue-300 rounded-sm border border-blue-600 cursor-pointer hover:bg-blue-400 transition-[background-color]"
      onClick={redirectToSpotifyAuthorize}
    >
      Login with Spotify
    </button>
  );
};
