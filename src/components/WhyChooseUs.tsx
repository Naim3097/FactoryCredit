import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import type { MediaDoc, WhyChooseUsData } from "@/types/cms";

function resolveImageSrc(
  image: MediaDoc | number | string | null | undefined,
  fallbackUrl: string | null | undefined,
): string | null {
  if (image && typeof image === "object" && image.url) {
    return image.url;
  }
  if (fallbackUrl) return fallbackUrl;
  return null;
}

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  const reasons = data.reasons ?? [];

  return (
    <section id="kenapa-kami" className="bg-white py-14 sm:py-20 lg:py-24" aria-label="Kenapa pilih kami">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <h2 className="text-center text-xl font-bold text-primary sm:text-2xl md:text-3xl lg:text-4xl">
          {data.heading}
        </h2>
        </RevealOnScroll>

        <div className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5 lg:gap-6">
          {reasons.map((r, i) => {
            const src = resolveImageSrc(r.image, r.imageUrl);
            const isLast = i === reasons.length - 1;
            const isOrphanOnMobile = isLast && reasons.length % 2 === 1;
            return (
            <RevealOnScroll
              key={r.id ?? r.title}
              delay={i * 120}
              className={`h-full ${
                isOrphanOnMobile
                  ? 'col-span-2 mx-auto w-[calc((100%-1rem)/2)] sm:col-span-1 sm:mx-0 sm:w-full'
                  : ''
              }`}
            >
            <div
              className="flex h-full flex-col overflow-hidden rounded-2xl shadow-lg sm:shadow-xl"
              style={{
                background: 'linear-gradient(180deg, #0A5C97 0%, #1DDDFF 100%)',
              }}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[4/5]">
                {src ? (
                  <Image
                    src={src}
                    alt={r.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 items-center justify-center px-2 py-3 sm:px-4 sm:py-5">
                <p className="text-center text-xs font-semibold text-white sm:text-base text-balance">
                  {r.title}
                </p>
              </div>
            </div>
            </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
