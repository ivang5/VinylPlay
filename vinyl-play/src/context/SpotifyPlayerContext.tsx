import React, { createContext, useContext, useEffect, useState } from "react";
import {
  initializeSpotifyPlayer,
  onPlayerReady,
  subscribeToPlayerState,
  togglePlay,
} from "../services/spotifyPlayerService";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    initializeSpotifyPlayer(accessToken).then(() => {
      const unsubscribeReady = onPlayerReady((id) => {
        setDeviceId(id);
      });

      const unsubscribeState = subscribeToPlayerState((state) => {
        setIsPlaying(state?.paused === false);
      });

      return () => {
        unsubscribeReady();
        unsubscribeState();
      };
    });
  }, [accessToken]);

  return (
    <SpotifyPlayerContext.Provider
      value={{
        isPlaying,
        deviceId,
        togglePlay,
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
