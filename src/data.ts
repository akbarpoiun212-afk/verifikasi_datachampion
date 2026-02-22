// data.ts
import Papa from "papaparse";

export interface SertifikatRow {
    id: string;
    code: string;
    nama: string;
    jenis: string;
    jabatan: string;
    tanggal: string;
    valid: string | number | boolean;
    created_at: string;
}

/* ================================
   GOOGLE SHEET CONFIG
================================ */
const SHEET_BASE =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTeIlHJZP-Et_0pNI-fKwaCCPlsQLSl1kk8qmyXrjhrToExdUzWdRFwO8agXaTkFjWFZBK3zkYaKdSZ/pub";

/**
 * Ganti GID sesuai sheet
 */
const SHEETS = {
    tableau: `${SHEET_BASE}?output=csv&gid=800400786`,
    fungsio: `${SHEET_BASE}?output=csv&gid=1003072757`, // ← ganti jika gid berbeda
};

/* ================================
   HELPERS
================================ */
function normalizeValid(val: any): boolean {
    if (val === true) return true;
    if (val === 1) return true;
    if (val === "1") return true;
    if (typeof val === "string" && val.toUpperCase() === "TRUE") return true;
    return false;
}

async function fetchSheet(url: string): Promise<SertifikatRow[]> {
    const res = await fetch(url);
    const csv = await res.text();

    const parsed = Papa.parse<SertifikatRow>(csv, {
        header: true,
        skipEmptyLines: true,
    });

    return parsed.data.map((row: SertifikatRow) => ({
        ...row,
        valid: normalizeValid(row.valid),
    }));
}

/* ================================
   PUBLIC API
================================ */
export async function getTableauData() {
    return fetchSheet(SHEETS.tableau);
}

export async function getFungsioData() {
    return fetchSheet(SHEETS.fungsio);
}

/* ================================
   SEARCH BY CODE
================================ */
export async function searchByCode(code: string, sheet: 'tableau' | 'fungsio' = 'fungsio'): Promise<SertifikatRow | null> {
    const sheetUrl = sheet === 'tableau' ? SHEETS.tableau : SHEETS.fungsio;
    const data = await fetchSheet(sheetUrl);
    const found = data.find(row => row.code?.toUpperCase() === code.toUpperCase());
    return found || null;
}
