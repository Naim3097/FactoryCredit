import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import type { WhyChooseUsData } from "@/types/cms";

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  const reasons = data.reasons ?? [];

  return (
    <section id="kenapa-kami" className="bg-white py-10 sm:py-12 lg:py-16" aria-label="Kenapa pilih kami">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <h2 className="text-center text-xl font-bold text-primary sm:text-2xl md:text-3xl lg:text-4xl">
          {data.heading}
        </h2>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-2 auto-rows-fr gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {reasons.map((r, i) => (
            <RevealOnScroll key={r.id ?? r.title} delay={i * 120} className={`h-full ${i === reasons.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <div
              className="flex h-full flex-col items-center justify-start rounded-2xl px-4 pb-6 pt-8 text-center shadow-lg"
              style={{
                background: 'linear-gradient(180deg, #0A5C97 0%, #1DDDFF 100%)',
              }}
            >
              <div className="relative mb-4 h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white/30 shadow-md sm:h-24 sm:w-24">
                <Image
                  src={r.imageUrl}
                  alt={r.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-semibold text-white sm:text-sm text-balance">{r.title}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
