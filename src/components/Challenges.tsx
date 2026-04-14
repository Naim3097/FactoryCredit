import Image from "next/image";

const concerns = [
  "Tidak pasti sama ada sah atau penipuan",
  "Memerlukan wang segera tetapi proses dikatakan lambat",
  "Bimbang kad bank akan ditahan",
  "Proses rumit dan banyak dokumen diperlukan",
];

export default function Challenges() {
  return (
    <section id="cabaran" className="relative overflow-hidden -mb-1" aria-label="Kenapa bimbang">
      {/* Aspect ratio wrapper — auto height on mobile, fixed ratio on desktop */}
      <div className="min-h-[520px] sm:min-h-[480px] lg:min-h-0 lg:[aspect-ratio:1920/1121]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/challenges-bg.png"
          alt="Lelaki yang bimbang memikirkan pinjaman"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
        {/* Bottom fade to blend into Problems section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0088cc] to-transparent z-[1]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 pb-28 sm:px-6 md:px-8 sm:pt-10 lg:pt-16 lg:pb-24 flex flex-col">
        <h2 className="text-center text-xl font-bold text-white sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight">
          Kenapa ramai orang masih bimbang
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>untuk memohon pembiayaan?
        </h2>

        {/* Mobile: single column, Desktop: split left/right */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-8 sm:gap-3 lg:flex-row lg:justify-center lg:gap-12 flex-1">
          {/* Left concerns */}
          <div className="flex flex-col gap-2 w-full max-w-xs sm:max-w-sm sm:gap-3 lg:w-1/3 lg:max-w-none">
            {concerns.filter((_, i) => i % 2 === 0).map((c) => (
              <div
                key={c}
                className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-center text-xs font-medium text-white backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {c}
              </div>
            ))}
          </div>

          {/* Spacer for center (image is background) */}
          <div className="hidden lg:block lg:w-1/3" />

          {/* Right concerns */}
          <div className="flex flex-col gap-2 w-full max-w-xs sm:max-w-sm sm:gap-3 lg:w-1/3 lg:max-w-none">
            {concerns.filter((_, i) => i % 2 === 1).map((c) => (
              <div
                key={c}
                className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-center text-xs font-medium text-white backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Green CTA banner pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 sm:pb-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-5xl rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-4 py-2.5 text-center sm:px-6 sm:py-3">
          <p className="text-xs font-bold text-white sm:text-base md:text-lg">
            Sebab itu proses pembiayaan kami lebih jelas & secara bersemuka
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
