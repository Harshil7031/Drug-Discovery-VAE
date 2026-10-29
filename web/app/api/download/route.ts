import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const dataDir = path.join(process.cwd(), "public", "data");

    // 1. Download 1,000 Molecules PDF Catalog
    if (type === "pdf") {
      let pdfPath = path.join(dataDir, "1000_new_drugs_catalog.pdf");
      if (!fs.existsSync(pdfPath)) {
        pdfPath = path.join(dataDir, "1000_new_drugs_multipage.pdf");
      }

      if (!fs.existsSync(pdfPath)) {
        return new NextResponse("PDF file not found on server", { status: 404 });
      }

      const pdfBuffer = fs.readFileSync(pdfPath);
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="1000_new_drugs_catalog.pdf"',
          "Content-Length": pdfBuffer.length.toString(),
        },
      });
    }

    // 2. Download Full 81k Generated Drugs Dataset (CSV)
    if (type === "81k") {
      const csvPath = path.join(dataDir, "all_generated_drugs_81k.csv");
      if (!fs.existsSync(csvPath)) {
        return new NextResponse("CSV dataset not found on server", { status: 404 });
      }

      const csvContent = fs.readFileSync(csvPath, "utf-8");
      const csvWithBom = csvContent.startsWith("\uFEFF") ? csvContent : "\uFEFF" + csvContent;

      return new NextResponse(csvWithBom, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="all_generated_drugs_81k.csv"',
        },
      });
    }

    // 3. Download Generated Batch (CSV)
    if (type === "batch") {
      const idsParam = searchParams.get("ids") || "";
      const requestedIds = idsParam
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      const molsJsonPath = path.join(dataDir, "molecules.json");
      if (!fs.existsSync(molsJsonPath)) {
        return new NextResponse("Molecules pool not found", { status: 404 });
      }

      const allMols = JSON.parse(fs.readFileSync(molsJsonPath, "utf-8")) as Array<{
        id: number;
        smiles: string;
        qed: number;
        logP: number;
        sas: number;
      }>;

      let selectedMols = allMols;
      if (requestedIds.length > 0) {
        const idSet = new Set(requestedIds);
        selectedMols = allMols.filter((m) => idSet.has(m.id));
      }

      const header = "id,smiles,qed,logP,sas\r\n";
      const rows = selectedMols
        .map((m) => `${m.id},"${m.smiles}",${m.qed},${m.logP},${m.sas}`)
        .join("\r\n");

      const csvContent = "\uFEFF" + header + rows;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="generated_drugs_batch.csv"',
        },
      });
    }

    return new NextResponse("Invalid download type requested", { status: 400 });
  } catch (error) {
    console.error("Download route error:", error);
    return new NextResponse("Server error processing download", { status: 500 });
  }
}
