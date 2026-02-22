// src/utils/datatabel.ts
// Deprecated: Menggunakan Google Sheets via data.ts
// File ini tetap dipertahankan untuk backward compatibility

import { searchByCode } from '../data';

export const TABLES = {
    FUNGSI: "fungsio",
    TABLEAU: "tableau"
};

// Helper legacy yang menggunakan data.ts
export const buildUrl = (_table: string, _code: string) => {
    // Function ini tidak lagi digunakan, gunakan searchByCode() dari data.ts
    // Disimpan untuk backward compatibility
    return '';
};

// Wrapper untuk searchByCode
export const findCertificate = async (code: string, table: 'fungsio' | 'tableau' = 'fungsio') => {
    return await searchByCode(code, table);
};
