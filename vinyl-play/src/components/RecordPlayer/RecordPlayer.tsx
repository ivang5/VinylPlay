import { Platter } from "./Platter";

export const RecordPlayer = () => {
  return (
    <div className="bg-[#3C4544] relative w-6xl h-[712px] rounded-sm">
      <div className="absolute inset-0 bg-[url('/textures/noise.png')]"></div>
      <div className="rounded-full absolute inset-y-[35px] left-[35px] w-[642px] bg-black"></div>
      <div className="rounded-full absolute inset-y-10 left-10 w-[632px] bg-[#D8D8D8]"></div>
      <Platter />
      <div className="rounded-full absolute inset-y-[76px] left-[76px] w-[560px] bg-black"></div>
      <div className="rounded-full absolute inset-y-[351px] left-[351px] w-[10px] bg-[#DFDFDF]"></div>
    </div>
  );
};
