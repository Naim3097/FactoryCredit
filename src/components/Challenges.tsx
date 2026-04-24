import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

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
      <div className="min-h-[620px] sm:min-h-[600px] lg:min-h-0 lg:[aspect-ratio:1920/1121]">
      {/* Full-bleed background image — separate mobile and desktop */}
      <div className="absolute inset-0 z-0">
        {/* Mobile background */}
        <Image
          src="/images/challenges-bg-mobile.png"
          alt="Lelaki yang bimbang memikirkan pinjaman"
          fill
          className="object-cover object-bottom lg:hidden"
          quality={90}
          sizes="(max-width: 1023px) 150vw, 0px"
          loading="lazy"
        />
        {/* Desktop background */}
        <Image
          src="/images/challenges-bg.png"
          alt="Lelaki yang bimbang memikirkan pinjaman"
          fill
          className="hidden lg:block object-cover object-center"
          quality={90}
          sizes="(min-width: 1024px) 100vw, 0px"
          loading="lazy"
        />
        {/* Bottom fade to blend into Problems section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0088cc] to-transparent z-[1]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 pb-28 sm:px-6 md:px-8 sm:pt-10 lg:pt-16 lg:pb-24 flex flex-col">
        <RevealOnScroll>
        <h2 className="text-center text-xl font-bold text-white sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight">
          Kenapa ramai orang masih bimbang
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>untuk memohon pembiayaan?
        </h2>
        </RevealOnScroll>

        {/* Mobile: single column stacked, Desktop: split left/right */}
        {/* Mobile view — all concerns stacked, same width */}
        <div className="mt-4 flex flex-col items-stretch gap-2.5 sm:gap-3 lg:hidden w-full max-w-xs sm:max-w-sm mx-auto">
          {concerns.map((c, idx) => (
            <RevealOnScroll key={c} delay={idx * 150}>
            <div
              className="rounded-full border-2 border-white/40 bg-white/10 px-5 py-2.5 text-center text-xs font-medium text-white backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm"
            >
              {c}
            </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Desktop view — split left/right */}
        <div className="hidden lg:flex lg:flex-row lg:justify-center lg:gap-12 flex-1 lg:mt-40">
          {/* Left concerns */}
          <div className="flex flex-col gap-2 lg:w-1/3 lg:max-w-none lg:gap-16">
            {concerns.filter((_, i) => i % 2 === 0).map((c, idx) => (
              <RevealOnScroll key={c} delay={idx * 150}>
              <div
                className="rounded-full border-2 border-white/40 bg-white/10 lg:px-8 lg:py-3.5 lg:text-base text-center font-medium text-white backdrop-blur-sm"
              >
                {c}
              </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Spacer for center (image is background) */}
          <div className="lg:w-1/3" />

          {/* Right concerns */}
          <div className="flex flex-col gap-2 lg:w-1/3 lg:max-w-none lg:gap-16">
            {concerns.filter((_, i) => i % 2 === 1).map((c, idx) => (
              <RevealOnScroll key={c} delay={(idx + 1) * 150}>
              <div
                className="rounded-full border-2 border-white/40 bg-white/10 lg:px-8 lg:py-3.5 lg:text-base text-center font-medium text-white backdrop-blur-sm"
              >
                {c}
              </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Green CTA banner pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 sm:pb-6 lg:px-8 lg:pb-8">
        <RevealOnScroll>
        <div className="mx-auto max-w-5xl rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-4 py-2.5 text-center sm:px-6 sm:py-3">
          <p className="text-xs font-bold text-white sm:text-base md:text-lg">
            Sebab itu proses pembiayaan kami lebih jelas & secara bersemuka
          </p>
        </div>
        </RevealOnScroll>
      </div>
      </div>
    </section>
  );
}
