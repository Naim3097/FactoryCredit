"use client";

import Image from "next/image";
import { useState } from "react";

const BRANCH_EMAILS: Record<string, string> = {
  satok: "kuching@factorycredit.com.my",
  samarahan: "ks@factorycredit.com.my",
  miri: "miri@factorycredit.com.my",
  bintulu: "bintulu@factorycredit.com.my",
};

export default function Hero() {
  const [formData, setFormData] = useState({
    jumlahPinjaman: "",
    umur: "",
    noIC: "",
    nama: "",
    email: "",
    telefon: "",
    sektorPekerjaan: "",
    gajiKasar: "",
    cawangan: "",
    sumberInfo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Only allow digits for specified fields
  const handleDigitField = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const digits = value.replace(/\D/g, "");

    if (name === "jumlahPinjaman") {
      // Max 5 digits, cap at 50000
      const capped = digits.slice(0, 5);
      if (capped !== "" && Number(capped) > 50000) return;
      setFormData((prev) => ({ ...prev, [name]: capped }));
    } else if (name === "umur") {
      // Max 2 digits, cap at 60
      const capped = digits.slice(0, 2);
      if (capped !== "" && Number(capped) > 60) return;
      setFormData((prev) => ({ ...prev, [name]: capped }));
    } else if (name === "telefon") {
      // Max 12 digits
      const capped = digits.slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: capped }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: digits }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const pinjaman = Number(formData.jumlahPinjaman);
    if (pinjaman < 1000 || pinjaman > 50000) {
      alert("Jumlah Pinjaman mestilah antara RM1,000 hingga RM50,000.");
      return;
    }

    const umur = Number(formData.umur);
    if (umur < 21 || umur > 60) {
      alert("Umur mestilah antara 21 hingga 60 tahun.");
      return;
    }

    const telefonLen = formData.telefon.length;
    if (telefonLen < 10 || telefonLen > 12) {
      alert("No. Telefon mestilah 10 hingga 12 digit.");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          branchEmail: BRANCH_EMAILS[formData.cawangan],
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          jumlahPinjaman: "",
          umur: "",
          noIC: "",
          nama: "",
          email: "",
          telefon: "",
          sektorPekerjaan: "",
          gajiKasar: "",
          cawangan: "",
          sumberInfo: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="mohon-sekarang"
      className="relative pt-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Aspect ratio wrapper — match bg image on desktop */}
      <div className="min-h-[700px] sm:min-h-[600px] lg:min-h-0 lg:[aspect-ratio:1920/836]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Pegawai Factory Credit di pejabat"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Mobile overlay for text readability */}
        <div className="absolute inset-0 bg-primary-deeper/40 lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-6 md:px-8 lg:py-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          {/* Left content */}
          <div className="text-white lg:pt-4">
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
          <div className="w-full rounded-2xl bg-white p-4 shadow-2xl sm:p-5 sm:max-w-sm sm:mx-auto lg:ml-auto lg:mr-0">
            <h2 className="mb-3 text-base font-extrabold text-accent-green sm:text-lg">
              Borang Daftar Pinjaman
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2.5" suppressHydrationWarning>
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  inputMode="numeric"
                  name="jumlahPinjaman"
                  placeholder="Jumlah Pinjaman (Minimum RM1000)"
                  value={formData.jumlahPinjaman}
                  onChange={handleDigitField}
                  onPaste={(e) => { if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  minLength={4}
                  maxLength={5}
                />
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  inputMode="numeric"
                  name="umur"
                  placeholder="Umur (Minimum 21 tahun & ke atas)"
                  value={formData.umur}
                  onChange={handleDigitField}
                  onPaste={(e) => { if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  minLength={2}
                  maxLength={2}
                />
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  name="noIC"
                  placeholder="No. IC"
                  value={formData.noIC}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                />
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                />
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                />
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="tel"
                  inputMode="numeric"
                  name="telefon"
                  placeholder="No. Telefon Bimbit cth: 0123456789"
                  value={formData.telefon}
                  onChange={handleDigitField}
                  onPaste={(e) => { if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  minLength={10}
                  maxLength={12}
                />
              </div>
              <div className="border-b border-gray-300">
                <select
                  name="sektorPekerjaan"
                  value={formData.sektorPekerjaan}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-400 lg:text-sm outline-none"
                  required
                >
                  <option value="" disabled>
                    Sila Pilih Sektor Pekerjaan
                  </option>
                  <option value="penjawat-awam">Penjawat Awam</option>
                  <option value="pekerja-glc">Pekerja GLC</option>
                  <option value="pekerja-swasta">Pekerja Swasta</option>
                  <option value="bekerja-sendiri">Bekerja Sendiri</option>
                  <option value="freelance">Freelance/Pekerja Gig</option>
                  <option value="pelajar">Pelajar</option>
                </select>
              </div>
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  name="gajiKasar"
                  placeholder="Gaji Kasar (Minimum RM2000)"
                  value={formData.gajiKasar}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                />
              </div>
              <div className="border-b border-gray-300">
                <select
                  name="cawangan"
                  value={formData.cawangan}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-400 lg:text-sm outline-none"
                  required
                >
                  <option value="" disabled>
                    Sila Pilih Cawangan
                  </option>
                  <option value="satok">Satok, Kuching</option>
                  <option value="samarahan">Kota Samarahan</option>
                  <option value="miri">Miri</option>
                  <option value="bintulu">Bintulu</option>
                </select>
              </div>
              <div className="border-b border-gray-300">
                <select
                  name="sumberInfo"
                  value={formData.sumberInfo}
                  onChange={handleChange}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-400 lg:text-sm outline-none"
                  required
                >
                  <option value="" disabled>
                    Bagaimana anda mengetahui tentang kami?
                  </option>
                  <option value="iklan-fb-ig">Iklan Facebook / Instagram</option>
                  <option value="post-fb-ig">Facebook / Instagram post (Bukan iklan)</option>
                  <option value="google">Pencarian Google</option>
                  <option value="rujukan">Rujukan Rakan / Keluarga</option>
                  <option value="walk-in">Walk In</option>
                  <option value="lain-lain">Lain-lain</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:text-sm"
              >
                {submitting ? "Menghantar..." : "Hantar"}
              </button>

              {submitStatus === "success" && (
                <p className="text-xs text-accent-green">Borang berjaya dihantar! Kami akan menghubungi anda.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs text-red-400">Gagal menghantar. Sila cuba lagi.</p>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
