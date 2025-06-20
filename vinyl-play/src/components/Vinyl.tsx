type VinylPropType = {
  image?: string;
};

export const Vinyl = ({ image }: VinylPropType) => (
  <div className="vinyl-pattern size-140 rounded-full relative border-8 border-black">
    <div className="vinyl-part size-68.5"></div>
    <div className="vinyl-part size-66 border-2 border-[#1a1a1a]"></div>
    <div className="vinyl-part size-62 border-2 border-[#1a1a1a]"></div>
    <div className="vinyl-part size-56 !bg-red-600 overflow-hidden">
      {image && <img src={image} alt="Album Cover" />}
    </div>
    <div className="vinyl-part size-3 !bg-gray-200"></div>
  </div>
);
