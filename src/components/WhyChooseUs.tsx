import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

const reasons = [
  {
    title: "Urusan hanya di pejabat",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop",
  },
  {
    title: "Tiada pegangan kad bank/ATM",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop",
  },
  {
    title: "Proses mudah, pantas",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=300&fit=crop",
  },
  {
    title: "Berlesen KPKT & patuh Syariah",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=300&fit=crop",
  },
  {
    title: "Dana diterima hari yang sama",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=300&fit=crop",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="kenapa-kami" className="bg-white py-10 sm:py-12 lg:py-16" aria-label="Kenapa pilih kami">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <h2 className="text-center text-xl font-bold text-primary sm:text-2xl md:text-3xl lg:text-4xl">
          Factory Credit Pilihan Ramai Orang Kerana...
        </h2>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-2 auto-rows-fr gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {reasons.map((r, i) => (
            <RevealOnScroll key={r.title} delay={i * 120} className={`h-full ${i === reasons.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <div
              className="flex h-full flex-col items-center justify-start rounded-2xl px-4 pb-6 pt-8 text-center shadow-lg"
              style={{
                background: 'linear-gradient(180deg, #0A5C97 0%, #1DDDFF 100%)',
              }}
            >
              <div className="relative mb-4 h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white/30 shadow-md sm:h-24 sm:w-24">
                <Image
                  src={r.image}
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
