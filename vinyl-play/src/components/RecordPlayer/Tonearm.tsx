export const Tonearm = () => {
  const lines = Array.from({ length: 24 });
  const radius = 88;

  return (
    <div className="absolute top-[70px] right-[280px] rounded-full bg-[#171717] size-64 z-10">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <circle
          cx="100"
          cy="100"
          r="77"
          fill="none"
          stroke="#0b0b0b"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray="300 145"
          strokeDashoffset="150"
        />
      </svg>
      <div className="absolute inset-[41px] size-44 rounded-full bg-black">
        {lines.map((_, i) => {
          const angle = i * (360 / lines.length);
          const isLong = i % 2 === 0;
          return (
            <div
              key={i}
              className="absolute w-px bg-white"
              style={{
                height: isLong ? radius * 0.98 : radius * 0.93,
                left: "50%",
                bottom: "50%",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: "center bottom",
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-[51px] size-[156px] rounded-full bg-linear-[45deg,#999_5%,#fff_10%,#ccc_30%,#ddd_50%,#ccc_70%,#fff_80%,#999_95%]">
        <div className="absolute opacity-50 inset-0 bg-[url('/textures/noise.png')]"></div>

        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 size-20 rounded-full bg-[#3a3a3a] shadow-[0_2px_6px_rgba(0,0,0,0.2),0_12px_32px_rgba(0,0,0,0.3)]">
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 size-[72px] overflow-hidden rounded-full bg-[#131313] after:absolute after:-inset-6 after:scale-70 after:rotate-12 after:content-['']
after:bg-[radial-gradient(#2f2f2f_1px,transparent_1px)]
after:bg-[length:7px_7px]"
          />
          <div
            className="z-10 absolute top-1/2 -translate-y-1/2 inset-x-0 h-6 border border-black overflow-hidden rounded-md rotate-[20deg] bg-[#131313] after:absolute after:-inset-6 after:scale-70 after:rotate-12 after:content-['']
after:bg-[radial-gradient(#2f2f2f_1px,transparent_1px)]
after:bg-[length:7px_7px]"
          />
          <div
            className="z-10 absolute top-1/2 -translate-y-[calc(50%+10px)] -translate-x-[calc(50%-16px)] -inset-x-1 h-6 border-2 border-black overflow-hidden rounded-md rounded-r-2xl rotate-[20deg] bg-[#131313] after:absolute after:-inset-6 after:scale-70 after:rotate-12 after:content-['']
after:bg-[radial-gradient(#2f2f2f_1px,transparent_1px)]
after:bg-[length:7px_7px]"
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full size-3 bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% z-10" />
          </div>

          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="absolute -top-2 -left-3.5 w-7 h-29 bg-[linear-gradient(90deg,#000_0%,#111_30%,#e5e7eb_50%,#111_70%,#000_100%)]">
              <div className="absolute w-full h-1 top-4.5 bg-[rgba(0,0,0,0.5)] border-x-2 border-x-gray-400 left-1/2 -translate-x-1/2" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-0 border-t-8 border-t-[#010101] border-x-14 border-x-transparent">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    className="absolute bottom-0 w-px h-0.5 bg-gray-400"
                    style={{ left: `${((i + 1) / 10) * 100}%` }}
                  />
                ))}
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-2 bg-[#2b2b2b]">
                {Array.from({ length: 29 }).map((_, i) => (
                  <div
                    className="absolute bottom-0 w-px h-full bg-[#0c0c0c]"
                    style={{ left: `${((i + 1) / 30) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
