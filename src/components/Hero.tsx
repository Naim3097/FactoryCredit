"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [formData, setFormData] = useState({
    jumlahPinjaman: "",
    nama: "",
    noIC: "",
    emel: "",
    telefon: "",
    slipGaji: "",
    kwsp: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section
      id="mohon-sekarang"
      className="relative pt-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Pegawai Factory Credit di pejabat"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Mobile overlay for text readability */}
        <div className="absolute inset-0 bg-primary-deeper/40 lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          {/* Left content */}
          <div className="text-white">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Pinjaman Peribadi
              <br />
              Patuh Syariah
            </h1>
            <p className="mt-3 text-sm text-white/90 max-w-md sm:text-base">
              Urusan di pejabat sahaja. Tiada pegangan kad bank. Proses mudah,
              pantas dan telus.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Patuh Syariah",
                "Berlesen KPKT",
                "Tiada Pegangan Kad ATM",
                "Pinjaman Diberikan Pada Hari Yang Sama!",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green text-white text-xs sm:h-6 sm:w-6 sm:text-sm">
                    ✓
                  </span>
                  <span className="text-sm font-medium sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="w-full rounded-xl bg-white p-3 shadow-2xl sm:p-5 sm:max-w-sm sm:mx-auto lg:ml-auto lg:mr-0">
            <h2 className="mb-1 text-center text-xs font-bold text-primary-deeper sm:text-base">
              Borang Daftar / Pinjaman
            </h2>
            <p className="mb-2 text-center text-[9px] text-gray-500 sm:mb-3 sm:text-[10px]">
              Jumlah Pinjaman (Minimum RM1000)
            </p>

            <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2.5">
              <input
                type="text"
                name="jumlahPinjaman"
                placeholder="Jumlah Pinjaman (Minimum RM1000)"
                value={formData.jumlahPinjaman}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
                required
              />
              <input
                type="text"
                name="nama"
                placeholder="Nama (Berdasarkan IC/Padanan Bila ada)"
                value={formData.nama}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
                required
              />
              <input
                type="text"
                name="noIC"
                placeholder="No. IC"
                value={formData.noIC}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
                required
              />
              <input
                type="email"
                name="emel"
                placeholder="Emel"
                value={formData.emel}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
                required
              />
              <input
                type="tel"
                name="telefon"
                placeholder="No. Telefon Bimbit (cth: 01XXXXXXXX)"
                value={formData.telefon}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
                required
              />
              <input
                type="text"
                name="slipGaji"
                placeholder="Slip Gaji Gross (Minimum RM1500)"
                value={formData.slipGaji}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
              />
              <input
                type="text"
                name="kwsp"
                placeholder="Slip Kwasa/KWSP (Minimum RM500)"
                value={formData.kwsp}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-[11px] focus:border-primary focus:ring-1 focus:ring-primary outline-none sm:px-3 sm:py-1.5 sm:text-xs"
              />

              <label className="flex items-start gap-1.5 text-[9px] text-gray-500 cursor-pointer sm:gap-2 sm:text-[10px]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 rounded"
                  required
                />
                <span>
                  Saya bersetuju untuk menghantarkan maklumat peribadi saya
                  kepada Factory Credit untuk tujuan pemprosesan pinjaman.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-1.5 text-xs font-bold text-white transition-colors hover:bg-primary-dark sm:py-2 sm:text-sm"
              >
                Hantar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
