import { BarChart3, Download } from 'lucide-react';

// Data Dummy
const dataTableau = [
    { id: 'TB-24-089', nama: 'Fajar Nugraha', project: 'Sales Dashboard', grade: 'A' },
    { id: 'TB-24-090', nama: 'Rina Wati', project: 'HR Analytics', grade: 'A+' },
    { id: 'TB-24-091', nama: 'Dedi Kurniawan', project: 'Supply Chain Viz', grade: 'B+' },
    { id: 'TB-24-092', nama: 'Maya Indah', project: 'Marketing ROI', grade: 'A' },
];

export default function Tableau() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Header Section */}
            <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center justify-center p-4 bg-yellow-100 rounded-full mb-5 shadow-lg shadow-yellow-400/30 group hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="text-yellow-600 w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-blue-700 mb-2">Mini Bootcamp Data Visualization</h2>
                <p className="text-gray-600 mt-2 font-semibold text-lg">📊 Peserta Tableau Periode Desember 2024</p>
                {/* Dekorasi garis dengan warna solid */}
                <div className="flex justify-center items-center gap-3 mt-6">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <div className="w-32 h-1.5 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
            </div>

            {/* Grid Card Layout (Alternatif dari Tabel) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataTableau.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-blue-200 hover:border-red-200 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded font-bold">{item.id}</span>
                            <div className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-bold text-xs">
                                {item.grade}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.nama}</h3>
                        <p className="text-sm text-red-600 mb-6 font-semibold">
                            📊 {item.project}
                        </p>

                        <button className="w-full py-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg">
                            <Download size={16} /> Unduh
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}