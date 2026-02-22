import { useState, useEffect } from 'react';
import { Users, CheckCircle, BadgeCheck } from 'lucide-react';
import { getFungsioData } from '../data';
import type { SertifikatRow } from '../data';

export default function Fungsio2024() {
    const [dataPengurus, setDataPengurus] = useState<SertifikatRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFungsioData();
                setDataPengurus(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                    <p className="text-slate-600 font-medium">Memuat data pengurus...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                    <p className="text-red-700 font-medium">Terjadi kesalahan: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">

            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 group">
                    <Users className="text-blue-600 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                    Daftar Penerima Sertifikat
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                    Pengurus Periode Tahun 2024
                </p>
                <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto mt-6 opacity-80"></div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Header: Menggunakan background soft gray, bukan solid blue agar lebih modern */}
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider pl-8">
                                    ID Sertifikat
                                </th>
                                <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">
                                    Nama Lengkap
                                </th>
                                <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">
                                    Jabatan
                                </th>
                                <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-center pr-8">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {dataPengurus.length > 0 ? (
                                dataPengurus.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-blue-50/50 transition-colors duration-200 group"
                                    >
                                        {/* Kolom ID: Style Badge Merah */}
                                        <td className="p-5 pl-8">
                                            <span className="font-mono text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md ring-1 ring-red-600/10 inline-block">
                                                {item.code}
                                            </span>
                                        </td>

                                        {/* Kolom Nama */}
                                        <td className="p-5">
                                            <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {item.nama}
                                            </div>
                                        </td>

                                        {/* Kolom Jabatan */}
                                        <td className="p-5">
                                            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                                <BadgeCheck size={14} className="text-blue-500" />
                                                {item.jabatan}
                                            </div>
                                        </td>

                                        {/* Kolom Aksi */}
                                        <td className="p-5 text-center pr-8">
                                            <button
                                                onClick={() => window.open(`/verify/${item.code}`, '_blank')}
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2 
                                                bg-white border border-blue-200 text-blue-600 
                                                hover:bg-blue-600 hover:text-white hover:border-blue-600 
                                                rounded-lg transition-all duration-200 
                                                text-xs font-bold shadow-sm hover:shadow-md"
                                            >
                                                <CheckCircle size={14} />
                                                Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Users className="w-12 h-12 mb-3 opacity-20" />
                                            <p className="text-sm font-medium">Tidak ada data pengurus ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}