import { cn } from "../utils/cn";

type VinylPropType = {
  image?: string;
  shouldSpin?: boolean;
};

export const Vinyl = ({ image, shouldSpin = false }: VinylPropType) => (
  <div
    className={cn(
      "vinyl-pattern size-140 rounded-full relative border-8 border-black",
      { "animate-[spin_5s_linear_infinite]": shouldSpin }
    )}
  >
    <div className="vinyl-part size-68.5"></div>
    <div className="vinyl-part size-66 border-2 border-[#1a1a1a]"></div>
    <div className="vinyl-part size-62 border-2 border-[#1a1a1a]"></div>
    <div className="vinyl-part size-56 !bg-red-600 overflow-hidden">
      {image && <img src={image} alt="Album Cover" />}
    </div>
    <div className="vinyl-part size-3 !bg-gray-200"></div>
  </div>
);
