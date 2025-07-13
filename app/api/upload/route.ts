import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files");

  const uploadDir = path.join(process.cwd(), "public", "storage");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const savedFiles: string[] = [];

  for (const file of files) {
    if (typeof file === "string") continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    savedFiles.push(`/storage/${filename}`);
  }

  return NextResponse.json({ success: true, urls: savedFiles });
}
