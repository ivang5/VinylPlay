import { redirectToSpotifyAuthorize } from "../auth/authService";
import { tokenStorage } from "../auth/tokenStorage";
import { getUserProfile } from "../api/spotifyApi";
import { useEffect, useState } from "react";
import { Vinyl } from "../components/Vinyl";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (tokenStorage.accessToken) {
      getUserProfile().then(setUser).catch(console.error);
    }
  }, []);

  return (
    <div>
      {!tokenStorage.accessToken ? (
        <button onClick={redirectToSpotifyAuthorize}>Login with Spotify</button>
      ) : (
        <>
          <button
            onClick={() => {
              tokenStorage.clear();
              location.reload();
            }}
          >
            Logout
          </button>
          {user && <div>Welcome {user.display_name}</div>}
          <Vinyl />
        </>
      )}
    </div>
  );
}
