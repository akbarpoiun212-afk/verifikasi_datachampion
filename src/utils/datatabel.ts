// src/utils/datatabel.ts

const BASE_URL = "https://eeslmmfvjdqdmfwkjriq.supabase.co/rest/v1";
const API_KEY = "sb_publishable_6bxkx4_2Df6Owbj9vP2Rew_KIPECKau";

// Daftar nama tabel Supabase yang ingin dipakai
export const TABLES = {
    FUNGSI: "Fungsio",
    TABLEAU: "Tableau"
};

// Helper untuk membuat URL lengkap
export const buildUrl = (table: string, code: string) => {
    return `${BASE_URL}/${table}?code=eq.${code}&select=*&apikey=${API_KEY}`;
};
