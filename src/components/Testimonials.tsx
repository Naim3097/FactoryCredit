import RevealOnScroll from "./RevealOnScroll";

type Testimonial = {
  id: number | string;
  quote: string;
  name: string;
  role: string;
  color: "red" | "blue" | "green" | "yellow" | "purple" | string;
};

const COLOR_MAP: Record<string, string> = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section id="testimoni" className="bg-white py-12 sm:py-16 lg:py-24 overflow-hidden" aria-label="Testimoni pelanggan">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Testimoni
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 sm:mt-3 sm:text-base">
          Bila pelanggan berpuas hati, kami juga senang hati.
        </p>
        </RevealOnScroll>
      </div>

      <div className="mt-8 sm:mt-12 relative">
        <div className="flex animate-marquee gap-6 w-max">
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="flex w-[300px] shrink-0 flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:w-[350px] sm:rounded-2xl sm:p-6"
            >
              <blockquote className="text-sm leading-relaxed text-gray-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${COLOR_MAP[t.color] ?? "bg-gray-400"} text-white text-lg`}
                  aria-hidden="true"
                >
                  ☺
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
