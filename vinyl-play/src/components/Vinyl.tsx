import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Vibrant, WorkerPipeline } from "node-vibrant/worker";
import PipelineWorker from "node-vibrant/worker.worker?worker";

Vibrant.use(new WorkerPipeline(PipelineWorker as never));

type VinylPropType = {
  imageUrl?: string;
  shouldSpin?: boolean;
};

export const Vinyl = ({ imageUrl, shouldSpin = false }: VinylPropType) => {
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
      ></div>
      <div className="vinyl-part size-3 !bg-gray-200"></div>
    </div>
  );
};
