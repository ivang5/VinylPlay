type CoverPropType = {
  image?: string;
};

export const Cover = ({ image }: CoverPropType) => {
  return (
    <div className="relative size-140 rounded-sm overflow-hidden shadow-lg">
      <img
        className="w-full h-full object-cover"
        src={image}
        alt="Album Cover"
      />
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/crumpled-paper-2.png')] opacity-20 mix-blend-multiply"></div>
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/crumpled-paper.png')] mix-blend-multiply"></div>
    </div>
  );
};
