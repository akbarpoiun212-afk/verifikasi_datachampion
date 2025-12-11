import { Users, Eye } from 'lucide-react';

// Data Dummy (Status dihapus)
const dataPengurus = [
    { id: 'F24-001', nama: 'Andi Saputra', divisi: 'Ketua Umum' },
    { id: 'F24-002', nama: 'Siti Aminah', divisi: 'Sekretaris' },
    { id: 'F24-003', nama: 'Budi Santoso', divisi: 'Bendahara' },
    { id: 'F24-004', nama: 'Citra Lestari', divisi: 'Humas' },
    { id: 'F24-005', nama: 'Eko Prasetyo', divisi: 'Logistik' },
];

export default function Fungsio2024() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Header Section */}
            <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-5 shadow-lg shadow-red-400/30 group hover:scale-110 transition-transform duration-300">
                    <Users className="text-red-600 w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-blue-700 mb-2">Daftar Penerima Sertifikat</h2>
                <p className="text-gray-600 mt-2 font-semibold text-lg">👥 Pengurus Periode Tahun 2024</p>
                {/* Dekorasi garis dengan warna solid */}
                <div className="flex justify-center items-center gap-3 mt-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-32 h-1.5 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-600 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-600">
                                <th className="p-4 font-bold text-white text-sm uppercase tracking-wider pl-6">ID Sertifikat</th>
                                <th className="p-4 font-bold text-white text-sm uppercase tracking-wider">Nama Lengkap</th>
                                <th className="p-4 font-bold text-white text-sm uppercase tracking-wider">Divisi</th>
                                <th className="p-4 font-bold text-white text-sm uppercase tracking-wider text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-100">
                            {dataPengurus.map((item, index) => (
                                <tr key={index} className="hover:bg-blue-50 transition-all duration-200 border-b border-gray-200">
                                    <td className="p-4 pl-6 font-mono text-blue-700 font-bold">
                                        {item.id}
                                    </td>
                                    <td className="p-4 font-semibold text-gray-800">{item.nama}</td>
                                    <td className="p-4 text-gray-700 font-medium">{item.divisi}</td>
                                    <td className="p-4 text-center">
                                        {/* Lihat Sertifikat Button */}
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-bold">
                                            <Eye size={16} />
                                            Lihat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}