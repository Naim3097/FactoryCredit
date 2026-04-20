import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

const problems = [
  {
    title: "Ingin menyelesaikan hutang lama tetapi komitmen bulanan tinggi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path d="M2 17l3-3 4 4 5-7 4 4 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6h5v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Rekod CTOS & Skor Kredit Rendah",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
        <path d="M2 10h20" stroke="white" strokeWidth="1.5"/>
        <path d="M6 15h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Memerlukan wang untuk kecemasan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path d="M12 9v4M12 17h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Ingin merenovasi rumah",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" stroke="white" strokeWidth="1.5"/>
        <path d="M14 21v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: "Memerlukan wang untuk deposit tunai",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5"/>
        <path d="M6 9v.01M18 15v.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Memerlukan dana pembiayaan pendidikan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path d="M12 3L1 9l11 6 9-4.91V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12.1v5.4a8.46 8.46 0 007 3.5 8.46 8.46 0 007-3.5v-5.4" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function Problems() {
  return (
    <section
      id="solusi-kami"
      className="relative overflow-hidden -mt-1"
      aria-label="Masalah kewangan"
    >
      <div className="min-h-[580px] sm:min-h-[500px] lg:min-h-0 lg:[aspect-ratio:1920/1400]">
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
          {problems.map((item, idx) => (
            <RevealOnScroll key={item.title} delay={idx * 100}>
            <div
              className="flex flex-col items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 p-3 text-center transition-transform hover:scale-105 sm:rounded-2xl sm:p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                {item.icon}
              </div>
              <p className="text-[11px] font-medium text-white leading-snug sm:text-sm">{item.title}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
