import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";

export const WebPlayback = () => {
  const { player, currentTrack, isPaused, isActive } = useSpotifyPlayer();

  if (!isActive) {
    return (
      <div className="text-lg">
        Instance not active. Transfer your playback using your Spotify app
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        <div className="text-lg leading-6 font-bold">
          {currentTrack?.artists[0]?.name}
        </div>
        <div className="text-2xl">{currentTrack?.name}</div>
      </div>

      <div className="flex gap-x-2 justify-center">
        <button
          className="px-3 py-1 bg-blue-300 rounded-sm border border-blue-600 cursor-pointer hover:bg-blue-400 transition-[background-color]"
          onClick={() => player?.previousTrack()}
        >
          &lt;&lt;
        </button>

        <button
          className="px-3 py-1 bg-blue-300 rounded-sm border border-blue-600 cursor-pointer hover:bg-blue-400 transition-[background-color]"
          onClick={() => player?.togglePlay()}
        >
          {isPaused ? "PLAY" : "PAUSE"}
        </button>

        <button
          className="px-3 py-1 bg-blue-300 rounded-sm border border-blue-600 cursor-pointer hover:bg-blue-400 transition-[background-color]"
          onClick={() => player?.nextTrack()}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
