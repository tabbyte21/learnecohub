import sharp from "sharp";

const ADMIN_URL = "https://learnecohub-admin-production.up.railway.app";

const mediaIds = [
  "cmms2dwuq0000pe3yxg4frs46",
  "cmms2faly0001pe3ybt0j9740",
  "cmms34k0o000fpe3y383e5okb",
  "cmms3ageb000kpe3y4hkid18s",
  "cmms2p6zl0009pe3yd4z35uax",
  "cmms33zy9000cpe3y0vfxzdp4",
  "cmms2o0tu0007pe3y2psvg08w",
  "cmms2mgeb0006pe3yoil10d3j",
  "cmms2mb430005pe3yk7l9pi6e",
  "cmms38f0l000jpe3yycy5u509",
  "cmms34yul000gpe3y587oogu5",
  "cmms2ube9000ape3ya2h4obvn",
  "cmms35f0k000hpe3y8dco7jpq",
];

async function compressMedia(id) {
  // 1. Download original image binary from serve endpoint
  const imgRes = await fetch(`${ADMIN_URL}/api/medya/${id}/serve`);
  if (!imgRes.ok) { console.log(`SKIP ${id}: serve failed (${imgRes.status})`); return; }

  const arrayBuf = await imgRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  const originalKB = (buffer.length / 1024).toFixed(0);

  // 2. Compress with sharp - resize to max 800px wide, JPEG quality 75
  const compressed = await sharp(buffer)
    .resize(800, 1000, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 75 })
    .toBuffer();
  const newKB = (compressed.length / 1024).toFixed(0);

  if (compressed.length >= buffer.length) {
    console.log(`SKIP ${id}: already small (${originalKB}KB)`);
    return;
  }

  // 3. Encode to base64 data URL
  const newBase64 = `data:image/jpeg;base64,${compressed.toString("base64")}`;

  // 4. Update in DB via admin API PUT
  const updateRes = await fetch(`${ADMIN_URL}/api/medya/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageData: newBase64, mimeType: "image/jpeg" }),
  });

  if (updateRes.ok) {
    console.log(`OK ${id}: ${originalKB}KB -> ${newKB}KB (${Math.round((1 - compressed.length / buffer.length) * 100)}% smaller)`);
  } else {
    const text = await updateRes.text();
    console.log(`FAIL ${id}: ${updateRes.status} ${text}`);
  }
}

async function main() {
  console.log(`Compressing ${mediaIds.length} gallery images...\n`);
  for (const id of mediaIds) {
    await compressMedia(id);
  }
  console.log("\nDone!");
}

main().catch(console.error);
