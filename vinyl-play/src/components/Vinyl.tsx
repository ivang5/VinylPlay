import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Vibrant, WorkerPipeline } from "node-vibrant/worker";
import PipelineWorker from "node-vibrant/worker.worker?worker";
import { truncateText } from "../utils/utils";

Vibrant.use(new WorkerPipeline(PipelineWorker as never));

type VinylPropType = {
  album?: any;
  imageUrl?: string;
  shouldSpin?: boolean;
};

export const Vinyl = ({
  album,
  imageUrl,
  shouldSpin = false,
}: VinylPropType) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!imageUrl) return;

    Vibrant.from(imageUrl)
      .getPalette()
      .then((palette) => setColor(palette.Vibrant?.hex || "#ffffff"));
  }, [imageUrl]);

  return (
    <div
      className={cn(
        "vinyl-pattern size-140 rounded-full relative border-8 border-black animate-[spin_5s_linear_infinite]",
        shouldSpin
          ? "[animation-play-state:running]"
          : "[animation-play-state:paused]"
      )}
    >
      <div className="vinyl-part size-68.5"></div>
      <div className="vinyl-part size-66 border-2 border-[#1a1a1a]"></div>
      <div className="vinyl-part size-62 border-2 border-[#1a1a1a]"></div>
      <div
        className="vinyl-part size-56 overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {album && (
          <div className="size-full relative flex flex-col items-center justify-between">
            <div>
              <h5 className="font-bold pt-10 px-8 text-base uppercase">
                {album.artists[0].name}
              </h5>
              <p className="text-base font-medium">{album.name}</p>
            </div>
            <div className="pb-10 flex flex-col items-center">
              <p className="text-3xs line-clamp-2 max-w-44">
                {album.copyrights[0].text}
              </p>
              <p className="text-3xs py-1">
                Total tracks: {album.total_tracks}
              </p>
              <p className="text-3xs">{album.release_date}</p>
            </div>
            <svg
              className="absolute inset-x-0 -bottom-1 size-full"
              width="224"
              height="224"
              viewBox="0 0 224 224"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="bottomArc"
                  d="M 12 112 A 100 100 0 0 0 212 112"
                  fill="none"
                />
              </defs>

              <text
                fontSize="10"
                fontFamily="Arial, sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <textPath href="#bottomArc" startOffset="50%">
                  {truncateText(album.label, 70)}
                </textPath>
              </text>
            </svg>
          </div>
        )}
      </div>
      <div className="vinyl-part size-3 !bg-gray-200"></div>
    </div>
  );
};
