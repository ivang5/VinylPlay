type CoverPropType = {
  image?: string;
};

export const Cover = ({ image }: CoverPropType) => {
  return (
    <div className="relative size-140 rounded-sm overflow-hidden shadow-2xl">
      {image ? (
        <img className="size-full object-cover" src={image} alt="Album Cover" />
      ) : (
        <div className="size-full flex items-center justify-center bg-gray-200">
          <h3 className="font-bold text-5xl opacity-80 ">Unknown...</h3>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/crumpled-paper-2.png')] opacity-20 mix-blend-multiply"></div>
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/crumpled-paper.png')] mix-blend-multiply"></div>
    </div>
  );
};
