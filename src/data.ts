/**
 * @fileoverview data.ts - Berisi mapping logika untuk menentukan tabel Supabase
 * berdasarkan kode sertifikat yang dimasukkan.
 */

interface TableMap {
    tableName: string | null;
    roleKey: 'Jabatan' | 'Project' | 'TIDAK DIKETAHUI';
}

/**
 * Fungsi untuk memetakan Prefix Kode Sertifikat ke Nama Tabel Supabase dan Kunci Peran.
 * @param code Kode sertifikat lengkap (misal: CERT-2024-AGT-011)
 * @returns Objek yang berisi nama tabel dan kunci peran/detail yang relevan.
 */
export const getTableAndRole = (code: string): TableMap => {
    if (!code || code.length < 3) {
        return { tableName: null, roleKey: 'TIDAK DIKETAHUI' };
    }

    // Normalisasi kode untuk pemeriksaan yang konsisten
    const normalizedCode = code.toUpperCase();

    // 1. PENGURUS 2024 (Fungsio)
    if (normalizedCode.includes('FUNGSIO') || normalizedCode.startsWith('F24')) {
        return {
            tableName: 'Fungsio',
            roleKey: 'Jabatan' // Kolom detail yang digunakan untuk Fungsio
        };
    }

    // 2. MINI BOOTCAMP TABLEAU
    // Asumsi: Kode untuk Tableau dimulai dengan TB atau mengandung TABLEAU
    // PASTIKAN 'MiniBootcampTableau' ADALAH NAMA TABEL YANG BENAR DI SUPABASE
    else if (normalizedCode.includes('TABLEAU') || normalizedCode.startsWith('TB')) {
        return {
            tableName: 'MiniBootcampTableau',
            roleKey: 'Project' // Kolom detail yang digunakan untuk Tableau
        };
    }

    // 3. TAMBAHKAN LOGIKA UNTUK TABEL LAIN DI SINI
    /*
    else if (normalizedCode.startsWith('WDS')) {
      return {
        tableName: 'WorkshopDataScience',
        roleKey: 'Materi'
      };
    }
    */

    // Default jika tidak ada yang cocok
    return { tableName: null, roleKey: 'TIDAK DIKETAHUI' };
};