import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const csvContent = (formData.get("csv") as string) || "";
    let filename = (formData.get("filename") as string) || "generated_drugs_batch.csv";

    if (!filename.endsWith(".csv")) {
      filename += ".csv";
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to download CSV" }, { status: 500 });
  }
}
