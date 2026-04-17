import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

const problems = [
  "Ingin menyelesaikan hutang lama tetapi komitmen bulanan tinggi",
  "Rekod CTOS & Skor Kredit Rendah",
  "Memerlukan wang untuk kecemasan",
  "Ingin merenovasi rumah",
  "Memerlukan wang untuk deposit tunai",
  "Memerlukan dana pembiayaan pendidikan",
];

export default function Problems() {
  return (
    <section
      id="solusi-kami"
      className="relative overflow-hidden -mt-1"
      aria-label="Masalah kewangan"
    >
      <div className="min-h-[580px] sm:min-h-[500px] lg:min-h-0 lg:[aspect-ratio:1920/1693]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/problems-bg.png"
          alt="Orang yang menghadapi masalah kewangan"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          loading="lazy"
        />
        {/* Top fade to blend with Challenges section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0088cc] to-transparent z-[1]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 lg:py-16">
        <RevealOnScroll>
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Anda mempunyai masalah ini?
        </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
        <p className="mt-2 text-center text-sm text-white/90 sm:mt-3 sm:text-base">
          Kalau ya, anda tidak keseorangan. Ramai pelanggan kami datang dengan
          situasi yang sama.
        </p>
        </RevealOnScroll>

        {/* Problem cards — 2 col on mobile, 3 on sm+ */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:gap-5 max-w-3xl mx-auto sm:mt-8">
          {problems.map((title, idx) => (
            <RevealOnScroll key={title} delay={idx * 100}>
            <div
              className="flex flex-col items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 p-3 text-center transition-transform hover:scale-105 sm:rounded-2xl sm:p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[11px] font-medium text-white leading-snug sm:text-sm">{title}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
