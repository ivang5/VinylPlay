import { tokenStorage } from "../auth/tokenStorage";
import { getAlbum, getTopTracks, getUserProfile } from "../api/spotifyApi";
import { useEffect, useState } from "react";
import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";
import { Vinyl } from "../components/Vinyl";
import { WebPlayback } from "../components/WebPlayback";
import { Cover } from "../components/Cover";
import { RecordPlayer } from "../components/RecordPlayer";

export const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<Spotify.Track[]>([]);
  const [album, setAlbum] = useState<any>(null);
  const token = tokenStorage.accessToken;
  const { isPaused, isActive, currentTrack } = useSpotifyPlayer();

  useEffect(() => {
    if (token) {
      getUserProfile().then(setUser).catch(console.error);
      getTopTracks().then(setTopTracks).catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    const albumId = currentTrack.album.uri.slice(14);
    getAlbum(albumId).then(setAlbum).catch(console.error);
  }, [currentTrack]);

  useEffect(() => {
    console.log(
      topTracks?.map(
        ({ name, artists }: { name: string; artists: any[] }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }, [topTracks]);

  return (
    <div className="flex flex-col items-center gap-5">
      {user && <div className="text-4xl">Welcome {user.display_name}</div>}
      <button
        className="px-3 py-1 bg-blue-300 rounded-sm border border-blue-600 cursor-pointer hover:bg-blue-400 transition-[background-color]"
        onClick={() => {
          tokenStorage.clear();
          location.reload();
        }}
      >
        Logout
      </button>
      <RecordPlayer />
      <Cover imageUrl={currentTrack?.album.images[0]?.url} />
      <Vinyl
        album={album}
        imageUrl={currentTrack?.album.images[0]?.url}
        shouldSpin={isActive && !isPaused}
      />
      <WebPlayback />
    </div>
  );
};
