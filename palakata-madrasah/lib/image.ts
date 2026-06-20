import sharp from "sharp";

export interface CompressOptions {
  width: number;
  height: number;
  /** Hard ceiling in bytes; quality is reduced until met (spec §11). */
  maxBytes?: number;
  quality?: number;
}

/** Per-type presets from spec §11. */
export const IMAGE_PRESETS = {
  student: { width: 400, height: 500, maxBytes: 200 * 1024 },
  teacher: { width: 400, height: 400, maxBytes: 300 * 1024 },
  gallery: { width: 1200, height: 800, maxBytes: 500 * 1024 },
  event: { width: 1200, height: 630, maxBytes: 400 * 1024 },
} satisfies Record<string, CompressOptions>;

/**
 * Resize + compress to WebP, lowering quality until under maxBytes.
 * Server-side only (sharp). Never store raw camera photos.
 */
export async function compressToWebp(
  input: Buffer,
  { width, height, maxBytes, quality = 82 }: CompressOptions
): Promise<Buffer> {
  let q = quality;
  let out = await render(input, width, height, q);

  while (maxBytes && out.byteLength > maxBytes && q > 40) {
    q -= 10;
    out = await render(input, width, height, q);
  }
  return out;
}

function render(input: Buffer, width: number, height: number, quality: number) {
  return sharp(input)
    .rotate() // honour EXIF orientation
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality })
    .toBuffer();
}
