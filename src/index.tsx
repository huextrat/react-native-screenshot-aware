import NativeScreenshotAware from "./NativeScreenshotAware";

export function multiply(a: number, b: number): Promise<number> {
  return NativeScreenshotAware.multiply(a, b);
}
