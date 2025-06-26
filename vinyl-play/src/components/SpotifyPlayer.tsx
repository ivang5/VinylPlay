// SpotifyPlayer.tsx
import { useEffect, useState } from "react";
import { transferPlaybackToDevice } from "../api/spotifyApi";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

type SpotifyPlayerProps = {
  accessToken: string;
};

const SpotifyPlayer = ({ accessToken }: SpotifyPlayerProps) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Vinyl Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Player ready with device ID:", device_id);
        setPlayer(player);
        setDeviceId(device_id);
        transferPlaybackToDevice(device_id);
      });

      player.addListener("initialization_error", ({ message }) =>
        console.error("Init error:", message)
      );
      player.addListener("authentication_error", ({ message }) =>
        console.error("Auth error:", message)
      );
      player.addListener("account_error", ({ message }) =>
        console.error("Account error:", message)
      );

      player.connect();
    };
  }, [accessToken]);

  const handleTogglePlay = () => {
    if (player) {
      player.togglePlay();
    }
  };

  return (
    <div>
      <button onClick={handleTogglePlay}>Toggle Play</button>
      {deviceId && <p>Connected to device: {deviceId}</p>}
    </div>
  );
};

export default SpotifyPlayer;
