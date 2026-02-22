import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ScanLine, Search } from 'lucide-react';

// Components
import Header from './components/Header';
import Fungsio2024 from './components/Fungsio2024';
import Tableau from './components/Tableau';
import Introml from './components/Introml';
import Verif from './components/Verif';


// --- Komponen VerificationPage yang Disesuaikan ---
function VerificationPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');
  const [searchCode, setSearchCode] = useState<string | null>(null);

  // ⭐ Jika URL punya kode → langsung tampilkan hasil verifikasi
  useEffect(() => {
    if (code) {
      setSearchCode(code.toUpperCase());
    }
  }, [code]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;

    const normalized = inputCode.toUpperCase().trim();

    // ⭐ Redirect otomatis ke halaman deep link
    navigate(`/verify/${normalized}`);

    setSearchCode(normalized);
  };

  const handleReset = () => {
    // ⭐ Kembali ke halaman form normal
    navigate('/');
    setSearchCode(null);
    setInputCode('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Blobs (Aksen Cyan & Rose) */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full relative z-10">

        {searchCode ? (
          // ⭐ Jika searchCode ada → tampilkan hasil verifikasi Supabase
          <Verif code={searchCode} onReset={handleReset} />
        ) : (
          // ⭐ Form input verifikasi (Menggunakan Biru sebagai CTA utama)
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 backdrop-blur-sm text-center relative overflow-hidden animate-in fade-in zoom-in duration-500">

            {/* Gradient Header (Aksen) */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-cyan-500 via-blue-500 to-rose-500"></div>

            {/* Icon (Aksen) */}
            <div className="mb-6 inline-block p-4 bg-linear-to-tr from-blue-50 to-cyan-50 rounded-full text-blue-600 shadow-lg shadow-blue-500/10">
              <ScanLine size={48} className="animate-pulse" />
            </div>

            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Verifikasi Dokumen</h1>
            <p className="text-slate-500 mb-8 text-base">Masukan Kode Sertifikat yang tertera di dokumen.</p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Contoh: CERT-2024-AGT-011"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                             transition-all font-mono uppercase text-slate-800 placeholder-slate-400 font-semibold"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  required
                />
              </div>

              {/* Tombol Submit (Warna CTA Utama: Biru) */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-cyan-700 hover:from-blue-700 
                             hover:to-cyan-800 text-white font-bold py-3.5 rounded-xl shadow-lg 
                             shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all active:scale-95 
                             flex items-center justify-center gap-2"
              >
                Verifikasi Sekarang
              </button>
            </form>
            <p className="text-slate-400 text-xs mt-6">
              Pastikan kode yang dimasukkan sudah benar.
            </p>
          </div>
        )}

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; Data Champion Society
        </p>
      </div>
    </div>
  );
}
// --- Akhir Komponen VerificationPage yang Disesuaikan ---


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        {/* Header di asumsikan sudah disesuaikan dengan warna Brand */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<VerificationPage />} />
            <Route path="/verify/:code" element={<VerificationPage />} />
            <Route path="/daftar-pengurus-2024" element={<Fungsio2024 />} />
            <Route path="/daftar-tableau" element={<Tableau />} />
            <Route path="/daftar-introml" element={<Introml />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;