import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, Calendar, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { TABLES, buildUrl } from '../utils/datatabel';

interface CertificateData {
    id: string;
    code: string;
    nama: string;
    jenis: string;
    jabatan: string;
    tanggal: string;
    valid: string;
    created_at: string;
}

interface VerifProps {
    code: string;
    onReset: () => void;
}

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
                let url1 = buildUrl(TABLES.FUNGSI, code);
                let res1 = await fetch(url1);
                let json1 = await res1.json();

                if (json1 && json1.length > 0) {
                    setData(json1[0]);
                    setLoading(false);
                    return;
                }

                // Jika tidak ditemukan → cek tabel 2 → Tableau
                let url2 = buildUrl(TABLES.TABLEAU, code);
                let res2 = await fetch(url2);
                let json2 = await res2.json();

                if (json2 && json2.length > 0) {
                    setData(json2[0]);
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

    // LOADING UI
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[400px]">
                <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Memeriksa Database...</p>
            </div>
        );
    }

    // ERROR / DATA TIDAK ADA
    if (error || !data) {
        return (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100 text-center max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
                    <XCircle className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
                <p className="text-gray-500 mb-6">
                    Kode sertifikat <span className="font-mono font-bold text-rose-500">{code}</span> tidak terdaftar.
                </p>
                <button
                    onClick={onReset}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                    Cari Lagi
                </button>
            </div>
        );
    }

    // JIKA DATA DITEMUKAN
    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg mx-auto border border-gray-100 animate-in fade-in zoom-in duration-300">

            {/* Header Status */}
            <div className={`p-6 flex items-center justify-between ${data.valid === 'TRUE'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : 'bg-rose-500'
                }`}>
                <div className="flex items-center gap-3 text-white">
                    {data.valid === 'TRUE' ? <ShieldCheck size={28} /> : <XCircle size={28} />}
                    <div>
                        <h3 className="font-bold text-lg">
                            {data.valid === 'TRUE' ? 'Sertifikat Valid' : 'Sertifikat Tidak Valid'}
                        </h3>
                        <p className="text-green-100 text-xs opacity-90">Official Verified Document</p>
                    </div>
                </div>

                <div className="bg-white/20 px-3 py-1 rounded-lg border border-white/30 text-white font-mono text-sm">
                    {data.code}
                </div>
            </div>

            <div className="p-8">
                <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                        {data.jenis}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.nama}</h1>
                    <p className="text-gray-500 text-sm">Telah menyelesaikan tugas sebagai:</p>
                    <p className="text-lg font-semibold text-rose-600 mt-2">{data.jabatan}</p>
                </div>

                <div className="border-t border-dashed border-gray-200 my-6"></div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                            <Calendar size={14} />
                            <span className="text-xs uppercase font-semibold">Tanggal Terbit</span>
                        </div>
                        <p className="font-medium text-gray-700">{data.tanggal}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                            <Award size={14} />
                            <span className="text-xs uppercase font-semibold">Status</span>
                        </div>
                        <p className={`font-medium ${data.valid === 'TRUE' ? 'text-green-600' : 'text-rose-600'}`}>
                            {data.valid === 'TRUE' ? 'Terverifikasi' : 'Dicabut'}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={onReset}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium"
                    >
                        <ArrowLeft size={18} />
                        Cek Sertifikat Lain
                    </button>
                </div>
            </div>
        </div>
    );
}
