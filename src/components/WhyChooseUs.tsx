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

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
          {reasons.map((r, i) => (
            <RevealOnScroll key={r.title} delay={i * 120}>
            <div
              className={`flex flex-col items-center gap-3 text-center ${i === reasons.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-primary/20 transition-transform hover:scale-110 sm:h-24 sm:w-24">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-medium text-gray-800 sm:text-sm max-w-[140px]">{r.title}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
