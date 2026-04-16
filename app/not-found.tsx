'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 flex items-center justify-center px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-15 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-15 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(70px)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl md:text-10xl font-black bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-slate-600">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 rounded-full mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-400"></div>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none shadow-lg"
        >
          <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
