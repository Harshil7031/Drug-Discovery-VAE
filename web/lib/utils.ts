import { Molecule } from "./types";

export function getQedBadgeClass(qed: number): string {
  if (qed >= 0.75) return "badge-good";
  if (qed >= 0.60) return "badge-warn";
  return "badge-bad";
}

export function getSasBadgeClass(sas: number): string {
  if (sas <= 3.0) return "badge-good";
  if (sas <= 4.5) return "badge-warn";
  return "badge-bad";
}

export function getLogPBadgeClass(logP: number): string {
  if (logP >= -0.4 && logP <= 5.0) return "badge-good";
  return "badge-warn";
}

export function downloadMoleculesAsCsv(molecules: Molecule[], filename = "generated_drugs_batch.csv") {
  if (!molecules || !molecules.length) return;

  const safeFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  const header = "id,smiles,qed,logP,sas\r\n";
  const rows = molecules
    .map((m) => `${m.id},"${m.smiles}",${m.qed},${m.logP},${m.sas}`)
    .join("\r\n");

  const csvContent = "\uFEFF" + header + rows;

  try {
    // Form POST to server endpoint with Content-Disposition attachment header
    // This forces Chrome and Windows to save the real file name and .csv extension natively!
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/export-csv-download";
    form.style.display = "none";

    const csvInput = document.createElement("input");
    csvInput.type = "hidden";
    csvInput.name = "csv";
    csvInput.value = csvContent;

    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "filename";
    nameInput.value = safeFilename;

    form.appendChild(csvInput);
    form.appendChild(nameInput);
    document.body.appendChild(form);

    form.submit();

    setTimeout(() => {
      try {
        document.body.removeChild(form);
      } catch {}
    }, 1500);
  } catch (e) {
    // Fallback using data: URI
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", safeFilename);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
      } catch {}
    }, 1000);
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
