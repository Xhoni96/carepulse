import { NextResponse } from "next/server";

import { database, DATABASE_ID } from "@/lib/appwrite.config";

export async function GET() {
  try {
    await database.listCollections(DATABASE_ID);

    return NextResponse.json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database check failed:", error);

    return NextResponse.json(
      {
        status: "Error",
        database: "Disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
