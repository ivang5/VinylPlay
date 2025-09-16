export const Platter = () => (
  <div className="rounded-full absolute inset-y-[43px] left-[43px] w-[626px] bg-[#0F0F10]">
    {Array.from({ length: 120 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[3px] h-[5px] bg-[#D8D8D8] rounded-full"
        style={{
          top: "49.5%",
          left: "49.7%",
          transform: `rotate(${i * 3}deg) translate(308px)`,
        }}
      />
    ))}
    {Array.from({ length: 120 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[6px] h-2 bg-[#D8D8D8] rounded-full"
        style={{
          top: "49.4%",
          left: "49.6%",
          transform: `rotate(${i * 3 - 0.9}deg) translate(301px)`,
        }}
      />
    ))}
    {Array.from({ length: 120 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[3px] h-[5px] bg-[#D8D8D8] rounded-full"
        style={{
          top: "49.5%",
          left: "49.7%",
          transform: `rotate(${i * 3 + 0.2}deg) translate(293px)`,
        }}
      />
    ))}
    {Array.from({ length: 120 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[3px] h-[5px] bg-[#D8D8D8] rounded-full"
        style={{
          top: "49.5%",
          left: "49.7%",
          transform: `rotate(${i * 3 + 0.9}deg) translate(287px)`,
        }}
      />
    ))}
  </div>
);
