import { tokenStorage } from "../auth/tokenStorage";
import { getTopTracks, getUserProfile } from "../api/spotifyApi";
import { useEffect, useState } from "react";
import { Vinyl } from "../components/Vinyl";
import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";

export const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any>(null);
  const accessToken = tokenStorage.accessToken;
  const { isPlaying, togglePlay, deviceId } = useSpotifyPlayer();

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
        <div>
          <button onClick={togglePlay}>Toggle Play</button>
          {deviceId && <p>Connected to device: {deviceId}</p>}
        </div>
      </div>
      <Vinyl shouldSpin={isPlaying} />
    </div>
  );
};
