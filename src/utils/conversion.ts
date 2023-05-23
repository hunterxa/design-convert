export function convertPxToRem(base: number, value: number): number {
  return roundToTwoDecimals(value / base);
} 

export function convertRemToPx(base: number, value: number): number {
  return roundToTwoDecimals(value * base);
}

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}