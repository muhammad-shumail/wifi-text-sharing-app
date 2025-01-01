// app/api/upload/route.js
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

// Ensure the uploads directory exists
const uploadsDir = path.join(process.cwd(), "public/uploads");

export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  try {
    // Write the file to the uploads directory
    await writeFile(path.join(uploadsDir, filename), buffer);
    return NextResponse.json({ message: "Success", filename }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
};
