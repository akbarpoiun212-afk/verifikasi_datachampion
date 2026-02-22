import { useState, useEffect } from 'react';
import { Brain, CheckCircle, Award, Users, UserCheck } from 'lucide-react';
import { getIntromlData } from '../data';
import type { SertifikatRow } from '../data';

export default function Introml() {
    const [dataIntroml, setDataIntroml] = useState<SertifikatRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'participants' | 'organizers'>('participants');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIntromlData();
                setDataIntroml(result);
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
                    <p className="text-slate-600 font-medium">Memuat data sertifikat...</p>
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

    // Filter data berdasarkan tab
    const participants = dataIntroml.filter(item => item.status?.toLowerCase() === 'peserta');
    const organizers = dataIntroml.filter(item => item.status?.toLowerCase() !== 'peserta');

    const displayedData = activeTab === 'participants' ? participants : organizers;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">

            {/* Header Section - Menggunakan Blue & Red sebagai Dominan */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
                    <Brain className="text-blue-600 w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                    Webinar Introduction To Machine Learning
                </h2>
                <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                    Event Webinar Pengenalan Machine Learning
                </p>
                <div className="w-16 h-1.5 bg-linear-to-r from-red-600 to-blue-600 rounded-full mx-auto mt-6 opacity-80"></div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 justify-center flex-wrap">
                <button
                    onClick={() => setActiveTab('participants')}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'participants'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/40'
                        : 'bg-white text-blue-700 border-2 border-blue-300 hover:bg-blue-50'
                        }`}
                >
                    <UserCheck size={20} />
                    Participants ({participants.length})
                </button>
                <button
                    onClick={() => setActiveTab('organizers')}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'organizers'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-400/40'
                        : 'bg-white text-red-700 border-2 border-red-300 hover:bg-red-50'
                        }`}
                >
                    <Users size={20} />
                    Organizers ({organizers.length})
                </button>
            </div>

            {/* Grid Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedData.length > 0 ? (
                    displayedData.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-blue-400 relative overflow-hidden flex flex-col justify-between h-full"
                        >
                            {/* Dekorasi Background halus */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100"></div>

                            <div>
                                {/* Header Card: Tags */}
                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    {/* Tag ID: Merah Lembut */}
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded-md ring-1 ring-red-600/10 font-bold">
                                        {item.code}
                                    </span>

                                    {/* Tag Role: Kuning/Amber Lembut (Lebih kontras dari kuning biasa) */}
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 font-bold text-[10px] uppercase tracking-wide">
                                        <Award size={12} />
                                        {item.jenis}
                                    </div>
                                </div>

                                {/* Content: Nama & Judul */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                        {item.nama}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                        {item.status}
                                    </p>
                                </div>
                            </div>

                            {/* Action Button - OUTLINE STYLE (Agar tidak tabrakan warna) */}
                            <button
                                onClick={() => window.open(`/verify/${item.code}`, '_blank')}
                                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 
                                bg-white border-2 border-blue-600 text-blue-700 
                                hover:bg-blue-600 hover:text-white 
                                rounded-lg transition-all duration-200 
                                text-sm font-bold tracking-wide mt-auto"
                            >
                                <CheckCircle size={18} />
                                <span>Verify Certificate</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                        <div className="p-4 bg-slate-50 rounded-full mb-3">
                            <Brain className="text-slate-400 w-8 h-8" />
                        </div>
                        <p className="text-slate-500 text-lg font-medium">Tidak ada data sertifikat ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
