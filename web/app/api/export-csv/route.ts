import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const molecules = body.molecules || [];

    const header = "id,smiles,qed,logP,sas\r\n";
    const rows = molecules
      .map(
        (m: { id: number; smiles: string; qed: number; logP: number; sas: number }) =>
          `${m.id},"${m.smiles}",${m.qed},${m.logP},${m.sas}`
      )
      .join("\r\n");

    // Add UTF-8 BOM so Excel opens it with perfect column formatting
    const csvContent = "\uFEFF" + header + rows;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="generated_drugs_batch.csv"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
