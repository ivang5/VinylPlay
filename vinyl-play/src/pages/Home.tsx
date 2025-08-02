import { redirectToSpotifyAuthorize } from "../auth/authService";
import { tokenStorage } from "../auth/tokenStorage";
import { getTopTracks, getUserProfile } from "../api/spotifyApi";
import { useEffect, useState } from "react";
import { Vinyl } from "../components/Vinyl";
import { SpotifyPlayer } from "../components/SpotifyPlayer";

export const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any>(null);
  const accessToken = tokenStorage.accessToken;

  useEffect(() => {
    if (accessToken) {
      getUserProfile().then(setUser).catch(console.error);
      getTopTracks().then(setTopTracks).catch(console.error);
    }
  }, []);

  useEffect(() => {
    console.log(
      topTracks?.map(
        ({ name, artists }: { name: string; artists: any[] }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }, [topTracks]);

  return (
    <div>
      {!accessToken ? (
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
          <div>
            <SpotifyPlayer accessToken={accessToken} />
          </div>
          <Vinyl />
        </>
      )}
    </div>
  );
};
