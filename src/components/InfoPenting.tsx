import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import type { InfoPentingData } from "@/types/cms";

export default function InfoPenting({ data }: { data: InfoPentingData }) {
  const terms = data.terms ?? [];

  return (
    <section
      id="info-penting"
      className="relative overflow-hidden"
      aria-label="Info Penting"
    >
      <div className="min-h-[850px] sm:min-h-[750px] lg:min-h-0 lg:[aspect-ratio:1920/836]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/info-penting-bg-mobile.png"
          alt="Pelanggan gembira selepas mendapat pinjaman"
          fill
          className="object-cover object-bottom lg:hidden"
          quality={90}
          sizes="(max-width: 1023px) 150vw, 0px"
          loading="lazy"
        />
        <Image
          src="/images/info-penting-bg.png"
          alt="Pelanggan gembira selepas mendapat pinjaman"
          fill
          className="hidden lg:block object-cover object-center"
          quality={90}
          sizes="(min-width: 1024px) 100vw, 0px"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 md:px-8 lg:py-24 flex items-start lg:items-center justify-start lg:justify-end min-h-full">
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-lg">
          <RevealOnScroll>
          <div>
            <p className="text-xs font-medium text-white/80 sm:text-sm italic">{data.eyebrow}</p>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {data.heading}
            </h2>
            <div className="mt-3 space-y-0.5 text-xs text-white/90 sm:mt-4 sm:text-sm lg:space-y-0">
              {terms.map((t) => (
                <p key={t.id ?? t.text} className="font-semibold">{t.text}</p>
              ))}
            </div>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
          <div className="mt-6 max-w-sm sm:mt-8">
            <div className="rounded-t-lg bg-[#22c55e] px-5 py-2.5 sm:px-6 sm:py-3">
              <h3 className="text-center text-xs font-bold text-white uppercase tracking-wider sm:text-sm">
                {data.exampleCardTitle}
              </h3>
            </div>
            <div className="rounded-b-lg bg-white px-5 py-4 shadow-xl sm:px-6 sm:py-5">
              <p className="text-[11px] text-gray-600 italic mb-3 sm:text-xs sm:mb-4">{data.exampleCardSubtitle}</p>
              <div className="space-y-2.5 text-xs text-gray-700 sm:space-y-3 sm:text-sm">
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Jumlah Pinjaman : </span>
                  <span className="font-bold">{data.example.amount}</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Kadar Faedah : </span>
                  <span className="font-bold">{data.example.rate}</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Tempoh : </span>
                  <span className="font-bold">{data.example.tenure}</span>
                </div>
                <div className="pb-2">
                  <span className="text-gray-500">Bayaran bulanan : </span>
                  <span className="font-bold">{data.example.monthly}</span>
                </div>
              </div>
            </div>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
          <div className="mt-5 sm:mt-6">
            <a
              href="#mohon-sekarang"
              className="inline-block rounded-full bg-[#22c55e] lg:bg-[#2196F3] lg:rounded-md px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-sm"
            >
              {data.ctaLabel}
            </a>
          </div>
          </RevealOnScroll>
        </div>
      </div>
      </div>
    </section>
  );
}
