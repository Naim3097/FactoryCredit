const testimonials = [
  {
    quote: "Proses yang sangat mudah dan pantas! Terima kasih Factory Credit.",
    name: "Syukri",
    role: "Pekerja Swasta, Kuching",
    color: "bg-red-400",
  },
  {
    quote:
      "Ejen sangat membantu, dari mula memohon hingga wang dimasukkan, semua soalan dijawab dengan terperinci.",
    name: "Fatin",
    role: "Pekerja Swasta, Bintulu",
    color: "bg-blue-400",
  },
  {
    quote:
        "Saya sangat berpuas hati dengan perkhidmatan Factory Credit. Yang penting, mereka membantu saya semasa kecemasan dan proses pun sangat pantas. Terbaik!",
      name: "Amelia",
      role: "Pekerja Swasta, Kota Samarahan",
    color: "bg-green-400",
  },
];

import RevealOnScroll from "./RevealOnScroll";

export default function Testimonials() {
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
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="flex w-[300px] shrink-0 flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:w-[350px] sm:rounded-2xl sm:p-6"
            >
              <blockquote className="text-sm leading-relaxed text-gray-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-white text-lg`}
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
