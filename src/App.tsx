import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ScanLine, Search } from 'lucide-react';

// Import Components
import Header from './components/Header';
import Fungsio2024 from './components/Fungsio2024';
import Tableau from './components/Tableau';
import Verif from './components/Verif'; // <-- Komponen Verifikasi Supabase yang baru

function VerificationPage() {
  const [inputCode, setInputCode] = useState('');
  // searchCode akan berisi string (kode sertifikat) atau null.
  // Jika string, komponen Verif.tsx akan di-render.
  const [searchCode, setSearchCode] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Pastikan kode yang dimasukkan dikonversi ke format yang diharapkan Supabase
    if (!inputCode) return;

    // Set searchCode untuk memicu tampilan komponen Verif.tsx
    // Menggunakan toUpperCase() untuk konsistensi dengan URL Supabase
    setSearchCode(inputCode.toUpperCase().trim());
  };

  const handleReset = () => {
    // Reset state untuk kembali ke halaman form input
    setSearchCode(null);
    setInputCode('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background decoration circles (Sesuai warna logo: Cyan dan Rose/Red) */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full relative z-10">

        {/* KONDISI: Jika searchCode ada, tampilkan hasil verifikasi. Jika tidak, tampilkan Form. */}
        {searchCode ? (
          // Tampilkan komponen Verif.tsx untuk melakukan fetching data
          <Verif code={searchCode} onReset={handleReset} />
        ) : (
          // Tampilan Form Input
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-white/50 backdrop-blur-sm text-center relative overflow-hidden">
            {/* Dekorasi Garis Atas */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-rose-500 to-amber-400"></div>

            <div className="mb-6 inline-block p-4 bg-gradient-to-tr from-cyan-50 to-blue-50 rounded-full text-cyan-600 shadow-inner">
              <ScanLine size={48} className="animate-pulse" />
            </div>

            <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Verifikasi Sertifikat</h1>
            <p className="text-gray-500 mb-8 text-sm">Masukan Kode Sertifikat (Contoh: CERT-2024-AGT-011) untuk mengecek keaslian.</p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Contoh: CERT-2024-AGT-011"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all font-mono uppercase text-gray-800 placeholder-gray-400"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                />
              </div>

              {/* Tombol dengan warna aksen Merah/Rose */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Verifikasi Sekarang
              </button>
            </form>
          </div>
        )}

        <p className="text-center text-gray-400 text-xs mt-8">
          &copy; 2024 Powered by React & Tailwind
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<VerificationPage />} />
            <Route path="/daftar-pengurus-2024" element={<Fungsio2024 />} />
            <Route path="/daftar-tableau" element={<Tableau />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App