"use client";

import Image from "next/image";
import { useState } from "react";

const BRANCH_WHATSAPP: Record<string, string> = {
  satok: "60162072017",
  samarahan: "60168868794",
  bintulu: "60143001881",
};

const BRANCH_LABELS: Record<string, string> = {
  satok: "Satok, Kuching",
  samarahan: "Kota Samarahan",
  bintulu: "Bintulu",
};

const SEKTOR_LABELS: Record<string, string> = {
  "penjawat-awam": "Penjawat Awam",
  "pekerja-glc": "Pekerja GLC",
  "pekerja-swasta": "Pekerja Swasta",
  "bekerja-sendiri": "Bekerja Sendiri",
  freelance: "Freelance/Pekerja Gig",
  pelajar: "Pelajar",
};

import type { HeroData } from "@/types/cms";

export default function Hero({ data }: { data: HeroData }) {
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
  const [waUrl, setWaUrl] = useState<string>("");
  const [showWaModal, setShowWaModal] = useState(false);
  const [showEmptyErrors, setShowEmptyErrors] = useState(false);

  const isEmpty = (name: keyof typeof formData) => formData[name].trim() === "";
  const fieldBorder = (name: keyof typeof formData) =>
    showEmptyErrors && isEmpty(name) ? "border-red-500" : "border-gray-300";

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
    } else if (name === "noIC") {
      // Exactly 12 digits max
      const capped = digits.slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: capped }));
    } else if (name === "gajiKasar") {
      // Max 6 digits (up to RM999,999)
      const capped = digits.slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: capped }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: digits }));
    }
  };

  // Disallow digits (used for Nama)
  const handleNoDigitsField = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const stripped = value.replace(/\d/g, "");
    setFormData((prev) => ({ ...prev, [name]: stripped }));
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

    // Highlight any empty fields and stop here so the user can fill them in
    const firstEmpty = (Object.keys(formData) as (keyof typeof formData)[]).find(
      (k) => formData[k].trim() === ""
    );
    if (firstEmpty) {
      setShowEmptyErrors(true);
      const el = document.querySelector<HTMLElement>(`[name="${firstEmpty}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
      return;
    }
    setShowEmptyErrors(false);

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

    if (formData.noIC.length !== 12 || !/^\d{12}$/.test(formData.noIC)) {
      alert("No. IC mestilah 12 digit.");
      return;
    }

    if (/\d/.test(formData.nama) || formData.nama.trim() === "") {
      alert("Nama tidak boleh mengandungi nombor.");
      return;
    }

    const telefonLen = formData.telefon.length;
    if (telefonLen < 10 || telefonLen > 12) {
      alert("No. Telefon mestilah 10 hingga 12 digit.");
      return;
    }

    const gaji = Number(formData.gajiKasar);
    if (!/^\d+$/.test(formData.gajiKasar) || gaji < 2000) {
      alert("Gaji Kasar mestilah minimum RM2,000 (digit sahaja).");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Build WhatsApp URL
        const waNumber = BRANCH_WHATSAPP[formData.cawangan];
        let url = "";
        if (waNumber) {
          const message = [
            `Salam, saya ingin memohon pinjaman.`,
            ``,
            `*Nama:* ${formData.nama}`,
            `*No. IC:* ${formData.noIC}`,
            `*Telefon:* ${formData.telefon}`,
            `*Email:* ${formData.email}`,
            `*Umur:* ${formData.umur} tahun`,
            `*Sektor Pekerjaan:* ${SEKTOR_LABELS[formData.sektorPekerjaan] || formData.sektorPekerjaan}`,
            `*Gaji Kasar:* RM${formData.gajiKasar}`,
            `*Jumlah Pinjaman:* RM${formData.jumlahPinjaman}`,
            `*Cawangan:* ${BRANCH_LABELS[formData.cawangan]}`,
          ].join("\n");
          url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        }
        setWaUrl(url);

        setSubmitStatus("success");

        // Desktop (≥ lg): direct redirect works fine. Mobile: show modal so user taps to open WA (required by iOS Safari).
        const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
        if (url && isDesktop) {
          window.location.href = url;
        } else if (url) {
          setShowWaModal(true);
        }

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
        {/* Mobile background */}
        <Image
          src="/images/hero-bg.png"
          alt="Pegawai Factory Credit di pejabat"
          fill
          className="object-cover object-top lg:hidden"
          priority
          quality={90}
          sizes="(max-width: 1023px) 200vw, 0px"
        />
        {/* Desktop background */}
        <Image
          src="/images/hero-bg-desktop.png"
          alt="Pegawai Factory Credit di pejabat"
          fill
          className="hidden lg:block object-cover object-top"
          priority
          quality={90}
          sizes="(min-width: 1024px) 100vw, 0px"
        />
        {/* Mobile overlay for text readability */}
        <div className="absolute inset-0 bg-primary-deeper/40 lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-6 md:px-8 lg:py-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          {/* Left content */}
          <div className="text-white lg:pt-4">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {data.headlineLine1}
              <br />
              {data.headlineLine2}
            </h1>
            <p className="mt-3 text-sm text-white/90 max-w-md sm:text-base">
              {data.subheadline}
            </p>
            <ul className="mt-4 space-y-2">
              {(data.bullets ?? []).map((item) => (
                <li key={item.id ?? item.text} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green text-white text-xs sm:h-6 sm:w-6 sm:text-sm">
                    ✓
                  </span>
                  <span className="text-sm font-medium sm:text-base">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="w-full rounded-2xl bg-white p-4 shadow-2xl sm:p-5 sm:max-w-sm sm:mx-auto lg:ml-auto lg:mr-0">
            <h2 className="mb-3 text-base font-extrabold text-accent-green sm:text-lg">
              {data.formHeading}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2.5" noValidate suppressHydrationWarning>
              <div className={`border-b ${fieldBorder("jumlahPinjaman")}`}>
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
                  pattern="\d+"
                  title="Hanya digit (1000 - 50000)"
                  minLength={4}
                  maxLength={5}
                />
              </div>
              <div className={`border-b ${fieldBorder("umur")}`}>
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
                  pattern="\d{2}"
                  title="Hanya digit (21 - 60)"
                  minLength={2}
                  maxLength={2}
                />
              </div>
              <div className={`border-b ${fieldBorder("noIC")}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  name="noIC"
                  placeholder="No. IC (12 digit)"
                  value={formData.noIC}
                  onChange={handleDigitField}
                  onPaste={(e) => { if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  pattern="\d{12}"
                  title="No. IC mestilah 12 digit"
                  minLength={12}
                  maxLength={12}
                />
              </div>
              <div className={`border-b ${fieldBorder("nama")}`}>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  value={formData.nama}
                  onChange={handleNoDigitsField}
                  onPaste={(e) => { if (/\d/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  pattern="[^\d]+"
                  title="Nama tidak boleh mengandungi nombor"
                />
              </div>
              <div className={`border-b ${fieldBorder("email")}`}>
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
              <div className={`border-b ${fieldBorder("telefon")}`}>
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
                  pattern="\d{10,12}"
                  title="No. Telefon mestilah 10 - 12 digit"
                  minLength={10}
                  maxLength={12}
                />
              </div>
              <div className={`border-b ${fieldBorder("sektorPekerjaan")}`}>
                <select
                  name="sektorPekerjaan"
                  value={formData.sektorPekerjaan}
                  onChange={handleChange}
                  className={`w-full bg-transparent py-1.5 text-xs lg:text-sm outline-none ${formData.sektorPekerjaan ? "text-gray-800" : "text-gray-400"}`}
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
              <div className={`border-b ${fieldBorder("gajiKasar")}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  name="gajiKasar"
                  placeholder="Gaji Kasar (Minimum RM2000)"
                  value={formData.gajiKasar}
                  onChange={handleDigitField}
                  onPaste={(e) => { if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault(); }}
                  className="w-full bg-transparent py-1.5 text-xs text-gray-800 lg:text-sm placeholder-gray-400 outline-none"
                  required
                  pattern="\d+"
                  title="Hanya digit (Minimum 2000)"
                  minLength={4}
                  maxLength={6}
                />
              </div>
              <div className={`border-b ${fieldBorder("cawangan")}`}>
                <select
                  name="cawangan"
                  value={formData.cawangan}
                  onChange={handleChange}
                  className={`w-full bg-transparent py-1.5 text-xs lg:text-sm outline-none ${formData.cawangan ? "text-gray-800" : "text-gray-400"}`}
                  required
                >
                  <option value="" disabled>
                    Sila Pilih Cawangan
                  </option>
                  <option value="satok">Satok, Kuching</option>
                  <option value="samarahan">Kota Samarahan</option>
                  <option value="bintulu">Bintulu</option>
                </select>
              </div>
              <div className={`border-b ${fieldBorder("sumberInfo")}`}>
                <select
                  name="sumberInfo"
                  value={formData.sumberInfo}
                  onChange={handleChange}
                  className={`w-full bg-transparent py-1.5 text-xs lg:text-sm outline-none ${formData.sumberInfo ? "text-gray-800" : "text-gray-400"}`}
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
                className="mt-1 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {submitting ? "Menghantar..." : "Hantar"}
              </button>
              {showEmptyErrors && (
                <p className="text-xs text-red-500">
                  Sila lengkapkan semua ruangan yang ditandakan.
                </p>
              )}

              {submitStatus === "success" && (
                <p className="text-xs text-accent-green">
                  Borang berjaya dihantar! Kami akan menghubungi anda.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs text-red-400">Gagal menghantar. Sila cuba lagi.</p>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>

      {/* WhatsApp confirmation modal (mobile only — desktop auto-redirects) */}
      {showWaModal && waUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black/60 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowWaModal(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowWaModal(false)}
              aria-label="Tutup"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="mx-auto w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-8 h-8">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Borang Berjaya Dihantar
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Sila sahkan permohonan anda melalui WhatsApp untuk pemprosesan yang lebih cepat.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowWaModal(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe57] active:bg-[#179347] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
              Sahkan Permohonan via WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setShowWaModal(false)}
              className="mt-3 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
