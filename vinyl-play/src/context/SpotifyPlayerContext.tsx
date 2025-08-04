import React, { createContext, useContext, useEffect, useState } from "react";
import {
  initializeSpotifyPlayer,
  onPlayerInstanceReady,
  onPlayerReady,
  subscribeToPlayerState,
} from "../services/spotifyPlayerService";
import { transferPlaybackToDevice } from "../api/spotifyApi";

type SpotifyPlayerContextType = {
  isPlaying: boolean;
  deviceId: string | null;
  togglePlay: () => void;
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | null>(
  null
);

export const SpotifyPlayerProvider = ({
  accessToken,
  children,
}: {
  accessToken: string;
  children: React.ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    initializeSpotifyPlayer(accessToken).then(() => {
      const unsubscribeReady = onPlayerReady(async (id) => {
        setDeviceId(id);
        await transferPlaybackToDevice(id);
      });

      const unsubscribeInstance = onPlayerInstanceReady((playerInstance) => {
        setPlayer(playerInstance);
      });

      const unsubscribeState = subscribeToPlayerState((state) => {
        setIsPlaying(state?.paused === false);
      });

      return () => {
        unsubscribeReady();
        unsubscribeInstance();
        unsubscribeState();
      };
    });
  }, [accessToken]);

  const handleTogglePlay = () => {
    if (!player) {
      console.warn("Spotify player not ready");
      return;
    }
    player.togglePlay();
  };

  return (
    <SpotifyPlayerContext.Provider
      value={{
        isPlaying,
        deviceId,
        togglePlay: handleTogglePlay,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = () => {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error(
      "useSpotifyPlayer must be used within a SpotifyPlayerProvider"
    );
  }
  return context;
};
