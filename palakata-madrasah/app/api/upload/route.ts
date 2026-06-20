import { auth } from "@/lib/auth";
import { compressToWebp, IMAGE_PRESETS } from "@/lib/image";
import { uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

/** Admin image upload: compress to WebP (spec §11) then store in R2. */
export async function POST(req: Request) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "PRINCIPAL")) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const type = String(form.get("type") ?? "gallery");

  if (!(file instanceof File)) {
    return Response.json({ error: "no_file" }, { status: 400 });
  }

  const preset =
    (IMAGE_PRESETS as Record<string, (typeof IMAGE_PRESETS)["gallery"]>)[type] ??
    IMAGE_PRESETS.gallery;

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const webp = await compressToWebp(input, preset);
    const key = `${type}/${Date.now()}-${crypto.randomUUID()}.webp`;
    const url = await uploadToR2(key, webp, "image/webp");
    return Response.json({ url, bytes: webp.byteLength });
  } catch (err) {
    return Response.json(
      { error: "upload_failed", message: err instanceof Error ? err.message : "unknown" },
      { status: 500 }
    );
  }
}
