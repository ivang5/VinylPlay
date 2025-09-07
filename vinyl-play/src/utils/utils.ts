export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace(/^#/, "");
  const bigint = parseInt(cleanHex, 16);

  if (cleanHex.length === 3) {
    return {
      r: ((bigint >> 8) & 0xf) * 17,
      g: ((bigint >> 4) & 0xf) * 17,
      b: (bigint & 0xf) * 17,
    };
  }

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const getContrastColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);

  // Calculate relative luminance (per W3C)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
