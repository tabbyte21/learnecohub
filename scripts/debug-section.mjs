#!/usr/bin/env node
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

async function main() {
  // Fetch akademik-yaklasimimiz to check content format
  const res = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz`);
  const page = await res.json();

  const mission = page.sections.find(s => s.sectionType === "mission");

  console.log("=== RAW content type:", typeof mission.content);
  console.log("=== RAW content first 200 chars:", JSON.stringify(mission.content).substring(0, 200));

  // Parse it
  const parsed = typeof mission.content === "string" ? JSON.parse(mission.content) : mission.content;
  console.log("\n=== PARSED checklist:", parsed.checklist);

  // Fix one thing and try to PUT
  const fixed = { ...parsed };
  fixed.checklist = parsed.checklist.map(item =>
    item.replace("dayali", "dayalı").replace("yaklaşımi", "yaklaşımı").replace("Coklu", "Çoklu").replace("kuramina", "kuramına").replace("araclari", "araçları").replace("mödülu", "modülü")
  );
  fixed.description = parsed.description
    .replace("tanitim", "tanıtım")
    .replace("pekistirme", "pekiştirme")
    .replace("asamalarindan", "aşamalarından")
    .replace("olusur", "oluşur");

  console.log("\n=== FIXED checklist:", fixed.checklist);
  console.log("=== FIXED description:", fixed.description);

  // Now try PUT with content as STRING (JSON.stringify)
  const contentStr = JSON.stringify(fixed);
  console.log("\n=== Sending content type: string, first 200:", contentStr.substring(0, 200));

  const putRes = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz/sections/${mission.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: mission.title,
      visible: mission.visible,
      content: contentStr,
    }),
  });

  const putResult = await putRes.json();
  console.log("\n=== PUT status:", putRes.status);
  console.log("=== PUT result content type:", typeof putResult.content);
  console.log("=== PUT result content first 200:", JSON.stringify(putResult.content).substring(0, 200));

  // Verify
  const verifyRes = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz`);
  const verified = await verifyRes.json();
  const verifiedMission = verified.sections.find(s => s.sectionType === "mission");
  const verifiedParsed = JSON.parse(verifiedMission.content);
  console.log("\n=== VERIFIED checklist:", verifiedParsed.checklist);
  console.log("=== VERIFIED description:", verifiedParsed.description);
}

main().catch(console.error);
