import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

const uploadsDir = path.join(process.cwd(), "public/uploads");
const imageUrls: unknown = [];
const shareableLink: unknown = [];

function getLocalIp() {
  const interfaces = require("os").networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// GET endpoint to retrieve the list of image URLs
export const GET = () => {
  return NextResponse.json({ imageUrls, shareableLink }, { status: 200 });
};

// POST endpoint to handle file uploads
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

    const localIp = getLocalIp();
    const port = process.env.PORT || 3000;
    const localUrl = `http://${localIp}:${port}/uploads/${filename}`;
    const publicUrl = `/uploads/${filename}`;

    // Update the in-memory array
    imageUrls.unshift(publicUrl); // Add the new image URL to the start of the array
    shareableLink.unshift(localUrl);

    return NextResponse.json(
      { message: "Success", filename, localUrl, publicUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
};
