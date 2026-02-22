import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import LogoDCS from '../assets/logo dcs nobg.png';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <nav className="bg-white border-b-2 border-blue-300 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={LogoDCS} alt="Data Champion Society Logo" className="h-14 w-auto group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                        <div className="flex flex-col gap-0">
                            <div className="flex items-baseline gap-1">
                                <span className="font-black text-base tracking-tighter text-red-600 uppercase leading-none">Data</span>
                                <span className="font-black text-base tracking-tighter text-red-600 uppercase leading-none">Champion</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-blue-700 leading-none">Society</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-300 font-semibold ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/40' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-100'}`}>
                            <Search size={18} /> Verifikasi
                        </Link>

                        {/* Dropdown Menu */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-300 font-semibold focus:outline-none ${location.pathname.includes('daftar') ? 'bg-red-600 text-white shadow-lg shadow-red-400/40' : 'text-gray-700 hover:text-red-600 hover:bg-red-100'}`}
                            >
                                Daftar Penerima <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Content */}
                            <div className={`absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                <div className="py-2">
                                    <Link
                                        to="/daftar-pengurus-2024"
                                        className="block px-5 py-3 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 font-semibold border-l-4 border-transparent hover:border-blue-600 transition-all"
                                    >
                                        Pengurus 2024
                                    </Link>
                                    <Link
                                        to="/daftar-tableau"
                                        className="block px-5 py-3 text-sm text-gray-800 hover:bg-yellow-100 hover:text-red-700 font-semibold border-l-4 border-transparent hover:border-yellow-600 transition-all"
                                    >
                                        Mini Bootcamp Tableau
                                    </Link>
                                    <Link
                                        to="/daftar-introml"
                                        className="block px-5 py-3 text-sm text-gray-800 hover:bg-purple-100 hover:text-purple-700 font-semibold border-l-4 border-transparent hover:border-purple-600 transition-all"
                                    >
                                        Webinar Introduction to ML
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-50 border-t-2 border-blue-200">
                    <div className="px-4 pt-3 pb-4 space-y-2">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-bold text-gray-800 bg-blue-100 hover:bg-blue-200 transition-all">🔍 Verifikasi Scan</Link>
                        <div className="border-t-2 border-blue-200 my-2"></div>
                        <p className="px-4 text-xs font-black text-blue-700 uppercase tracking-wider">📋 Daftar Penerima</p>
                        <Link to="/daftar-pengurus-2024" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gray-800 hover:bg-blue-200 font-semibold border-l-4 border-blue-500 pl-4 transition-all">👥 Pengurus 2024</Link>
                        <Link to="/daftar-tableau" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gray-800 hover:bg-yellow-200 font-semibold border-l-4 border-yellow-500 pl-4 transition-all">📊 Bootcamp Tableau</Link>
                        <Link to="/daftar-introml" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gray-800 hover:bg-purple-200 font-semibold border-l-4 border-purple-500 pl-4 transition-all">🧠 Webinar Intro ML</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}