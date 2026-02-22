import { useEffect, useState } from 'react';
import { XCircle, Loader2, Calendar, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { searchByCode } from '../data';
import type { SertifikatRow } from '../data';

type CertificateData = SertifikatRow;

interface VerifProps {
    code: string;
    onReset: () => void;
}

// Konstanta Warna untuk Konsistensi
const COLORS = {
    BRAND_BLUE: 'blue',
    VALID_GREEN: 'emerald',
    INVALID_RED: 'rose',
    INFO_CYAN: 'sky',
};

export default function Verif({ code, onReset }: VerifProps) {
    const [data, setData] = useState<CertificateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                // Cek tabel 1 → Fungsio
                let result1 = await searchByCode(code, 'fungsio');

                if (result1) {
                    setData(result1);
                    setLoading(false);
                    return;
                }

                // Jika tidak ditemukan → cek tabel 2 → Tableau
                let result2 = await searchByCode(code, 'tableau');

                if (result2) {
                    setData(result2);
                    setLoading(false);
                    return;
                }

                // Jika tidak ditemukan → cek tabel 3 → Introml
                let result3 = await searchByCode(code, 'introml');

                if (result3) {
                    setData(result3);
                } else {
                    setError(true);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (code) fetchData();
    }, [code]);

    // LOADING UI - Menggunakan Brand Blue
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-xl border border-blue-100 min-h-[400px] max-w-lg mx-auto">
                <Loader2 className={`w-12 h-12 text-${COLORS.BRAND_BLUE}-600 animate-spin mb-4`} />
                <p className="text-slate-500 font-medium">Memeriksa Database...</p>
                <p className="text-slate-400 text-sm mt-1">Kode: {code}</p>
            </div>
        );
    }

    // ERROR / DATA TIDAK ADA - Menggunakan Invalid Red
    if (error || !data) {
        return (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100 text-center max-w-lg mx-auto animate-in fade-in duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                    <XCircle className={`w-8 h-8 text-${COLORS.INVALID_RED}-600`} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Data Tidak Ditemukan</h2>
                <p className="text-slate-500 mb-6">
                    Kode sertifikat <span className={`font-mono font-bold text-${COLORS.INVALID_RED}-600`}>{code}</span> tidak terdaftar.
                </p>
                <button
                    onClick={onReset}
                    className={`px-6 py-2 bg-${COLORS.BRAND_BLUE}-50 hover:bg-${COLORS.BRAND_BLUE}-100 text-${COLORS.BRAND_BLUE}-600 rounded-xl font-medium transition-colors border border-${COLORS.BRAND_BLUE}-100`}
                >
                    <ArrowLeft size={18} className='inline-block mr-2' /> Cari Lagi
                </button>
            </div>
        );
    }

    // JIKA DATA DITEMUKAN
    const isValid = data.valid === true || data.valid === 1 || data.valid === '1' || data.valid === 'TRUE';
    const headerColorClass = isValid
        ? 'bg-white border border-emerald-200' // White background for valid
        : `bg-gradient-to-r from-${COLORS.INVALID_RED}-500 to-${COLORS.INVALID_RED}-700`; // Invalid Red Gradient

    const statusTextClass = isValid ? `text-${COLORS.VALID_GREEN}-600` : `text-${COLORS.INVALID_RED}-600`;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg mx-auto border border-slate-200 animate-in fade-in zoom-in duration-500">

            {/* Header Status (VALID / TIDAK VALID) */}
            <div className={`p-6 flex items-center justify-between ${headerColorClass}`}>
                <div className="flex items-center gap-4">
                    {isValid ? <ShieldCheck size={32} className={`text-${COLORS.VALID_GREEN}-600`} /> : <XCircle size={32} className="text-white" />}
                    <div>
                        <h3 className={`font-extrabold text-xl tracking-wide ${isValid ? `text-${COLORS.VALID_GREEN}-600` : 'text-white'}`}>
                            {isValid ? 'VERIFIKASI SUKSES' : 'VERIFIKASI GAGAL'}
                        </h3>
                        <p className={`text-sm mt-0.5 ${isValid ? `text-${COLORS.BRAND_BLUE}-600` : 'text-white/80'}`}>
                            Sertifikat: {isValid ? 'Terverifikasi Resmi' : 'Tidak Valid/Dicabut'}
                        </p>
                    </div>
                </div>

                <div className={`px-3 py-1 rounded-full border font-mono text-xs font-bold shadow-inner ${isValid ? `bg-${COLORS.INVALID_RED}-50 text-${COLORS.INVALID_RED}-600 border-${COLORS.INVALID_RED}-200` : 'bg-white/20 text-white border-white/30'}`}>
                    {data.code}
                </div>
            </div>

            <div className="p-8">
                <div className="text-center mb-8">
                    {/* Badge Jenis Sertifikat - Menggunakan Info Cyan */}
                    <div className={`inline-block px-4 py-1.5 bg-${COLORS.INFO_CYAN}-50 text-${COLORS.INFO_CYAN}-600 rounded-full text-xs font-bold uppercase tracking-wide mb-3 border border-${COLORS.INFO_CYAN}-200`}>
                        {data.jenis}
                    </div>

                    {/* Nama dan Jabatan */}
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2 leading-snug">{data.nama}</h1>
                    <p className="text-slate-500 text-base font-medium">Telah menyelesaikan tugas sebagai:</p>
                    <p className={`text-xl font-bold text-${COLORS.BRAND_BLUE}-600 mt-2`}>
                        {data.jabatan || data.status}
                    </p>
                </div>

                <div className="border-t border-dashed border-slate-200 my-6"></div>

                {/* Detail Metadata */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Calendar size={16} className={`text-${COLORS.VALID_GREEN}-500`} />
                            <span className="text-xs uppercase font-semibold">Tanggal Terbit</span>
                        </div>
                        <p className="font-bold text-slate-700 mt-1">{data.tanggal}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Award size={16} className={statusTextClass} />
                            <span className="text-xs uppercase font-semibold">Status Dokumen</span>
                        </div>
                        <p className={`font-bold mt-1 ${statusTextClass}`}>
                            {isValid ? 'TERVERIFIKASI' : 'DICABUT'}
                        </p>
                    </div>
                </div>

                {/* Tombol Kembali */}
                <div className="mt-8">
                    <button
                        onClick={onReset}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 transition-all font-semibold"
                    >
                        <ArrowLeft size={18} />
                        Cek Sertifikat Lain
                    </button>
                </div>
            </div>
        </div>
    );
}