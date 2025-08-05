import React, { createContext, useContext, useEffect, useState } from "react";
import { transferPlaybackToDevice } from "../api/spotifyApi";

type SpotifyPlayerContextType = {
  player: Spotify.Player | undefined;
  currentTrack: Spotify.Track | undefined;
  isPaused: boolean;
  isActive: boolean;
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | null>(
  null
);

export const SpotifyPlayerProvider = ({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | undefined>();
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector("#spotify-player-sdk");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "spotify-player-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (player) return;

      const _player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      setPlayer(_player);

      _player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        transferPlaybackToDevice(device_id);
      });

      _player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      _player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);
        _player.getCurrentState().then((state) => {
          setActive(!!state);
        });
      });

      _player.connect();
    };
  }, [token]);

  return (
    <SpotifyPlayerContext.Provider
      value={{
        player,
        currentTrack,
        isPaused,
        isActive,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export function useSpotifyPlayer(): SpotifyPlayerContextType {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error(
      "useSpotifyPlayer must be used within a SpotifyPlayerProvider"
    );
  }
  return context;
}
