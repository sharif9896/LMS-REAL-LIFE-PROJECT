import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export function jsonToWorkbook(rows) {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "exams");
  return wb;
}

export function workbookToFile(wb, outDir, filename) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const full = path.join(outDir, filename);
  XLSX.writeFile(wb, full);
  return full;
}

export function workbookFromFile(filePath) {
  const wb = XLSX.readFile(filePath);
  const sheetName = wb.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
    defval: null,
    raw: true,
  });
  return rows;
}
