export const Tonearm = () => {
  return (
    <div className="absolute top-[70px] right-[280px] rounded-full bg-[#111111] size-64 z-0">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <circle
          cx="100"
          cy="100"
          r="77"
          fill="none"
          stroke="black"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray="300 145"
          strokeDashoffset="150"
        />
      </svg>
    </div>
  );
};
