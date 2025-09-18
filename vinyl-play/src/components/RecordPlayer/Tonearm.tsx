export const Tonearm = () => {
  const lines = Array.from({ length: 24 });
  const radius = 88;

  return (
    <div className="absolute top-[70px] right-[280px] rounded-full bg-[#171717] size-64 z-0">
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
      </div>
    </div>
  );
};
