// utils/colorUtils.ts

export interface ColorMap {
  name: string;
  rgb: [number, number, number];
}

// List of 20+ common colors
const colors: ColorMap[] = [
  { name: "Black", rgb: [0, 0, 0] },
  { name: "White", rgb: [255, 255, 255] },
  { name: "Red", rgb: [255, 0, 0] },
  { name: "Green", rgb: [0, 255, 0] },
  { name: "Blue", rgb: [0, 0, 255] },
  { name: "Yellow", rgb: [255, 255, 0] },
  { name: "Cyan", rgb: [0, 255, 255] },
  { name: "Magenta", rgb: [255, 0, 255] },
  { name: "Gray", rgb: [128, 128, 128] },
  { name: "Maroon", rgb: [128, 0, 0] },
  { name: "Olive", rgb: [128, 128, 0] },
  { name: "Purple", rgb: [128, 0, 128] },
  { name: "Teal", rgb: [0, 128, 128] },
  { name: "Navy", rgb: [0, 0, 128] },
  { name: "Orange", rgb: [255, 165, 0] },
  { name: "Pink", rgb: [255, 192, 203] },
  { name: "Brown", rgb: [165, 42, 42] },
  { name: "Gold", rgb: [255, 215, 0] },
  { name: "Silver", rgb: [192, 192, 192] },
  { name: "Beige", rgb: [245, 245, 220] },
  { name: "Lime", rgb: [0, 255, 0] },
  { name: "Turquoise", rgb: [64, 224, 208] },
];

// Helper function to calculate distance
const distance = (c1: [number, number, number], c2: [number, number, number]) =>
  Math.sqrt(
    (c1[0] - c2[0]) ** 2 +
    (c1[1] - c2[1]) ** 2 +
    (c1[2] - c2[2]) ** 2
  );

// Main function
export function rgbToName(rgbStr: string) {
  const [r, g, b] = rgbStr.match(/\d+/g)!.map(Number) as [number, number, number];

  let closest = colors[0];
  let minDist = distance([r, g, b], colors[0].rgb);

  for (const c of colors) {
    const dist = distance([r, g, b], c.rgb);
    if (dist < minDist) {
      minDist = dist;
      closest = c;
    }
  }

  return closest.name;
}
