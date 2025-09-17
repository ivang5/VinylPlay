import { Platter } from "./Platter";
import { Tonearm } from "./Tonearm";

type RecordPlayerPropType = {
  shouldSpin?: boolean;
};

export const RecordPlayer = ({ shouldSpin = false }: RecordPlayerPropType) => {
  return (
    <div className="bg-[#3C4544] relative w-6xl h-[712px] rounded-sm">
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[url('/textures/noise.png')]"></div>
        <div className="rounded-full absolute inset-y-[35px] left-[35px] w-[642px] bg-black"></div>
        <Platter shouldSpin={shouldSpin} />
        <div className="rounded-full absolute inset-y-[76px] left-[76px] w-[560px] bg-black"></div>
        <div className="rounded-full absolute inset-y-[351px] left-[351px] w-[10px] bg-[#DFDFDF]"></div>
      </div>
      <Tonearm />
    </div>
  );
};
