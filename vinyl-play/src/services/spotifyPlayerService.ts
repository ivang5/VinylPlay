let player: Spotify.Player | null = null;
let deviceId: string | null = null;
const listeners: Set<(state: Spotify.PlaybackState | null) => void> = new Set();
let readyCallbacks: Set<(deviceId: string) => void> = new Set();

export const initializeSpotifyPlayer = (accessToken: string): Promise<void> => {
  return new Promise((resolve) => {
    if (player) return resolve();

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
        name: "Vinyl Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        deviceId = device_id;
        readyCallbacks.forEach((cb) => cb(device_id));
        resolve();
      });

      player.addListener("player_state_changed", (state) => {
        listeners.forEach((listener) => listener(state));
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
  });
};

export const getPlayer = () => {
  return player;
};

export const togglePlay = async () => {
  if (player) {
    await player.togglePlay();
  }
};

export const subscribeToPlayerState = (
  callback: (state: Spotify.PlaybackState | null) => void
) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const onPlayerReady = (cb: (deviceId: string) => void) => {
  if (deviceId) cb(deviceId);
  else readyCallbacks.add(cb);
  return () => readyCallbacks.delete(cb);
};
