import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import type { ChallengesData } from "@/types/cms";

const STROKE = "white";

const CHALLENGE_ICONS: Record<string, React.ReactNode> = {
  question: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={STROKE} strokeWidth="1.5" />
      <path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 17h.01" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3v6h6" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={STROKE} strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" stroke={STROKE} strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 118 0v4" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  percent: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <path d="M19 5L5 19" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.5" cy="7.5" r="2.5" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="16.5" cy="16.5" r="2.5" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  ),
  hiddenFee: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <path d="M3 3l18 18" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.6 6.1A9 9 0 0121 12s-1 1.7-2.7 3.4M6.7 6.7C4 8.4 3 12 3 12s3 6 9 6c1.4 0 2.7-.3 3.8-.8" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.5" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  ),
  reject: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={STROKE} strokeWidth="1.5" />
      <path d="M8 8l8 8M16 8l-8 8" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
      <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.4A8 8 0 1121 12z" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

const DEFAULT_ICON_ORDER = [
  "question",
  "document",
  "clock",
  "percent",
  "hiddenFee",
  "reject",
  "lock",
  "shield",
  "money",
  "chat",
];

// Keyword → icon mapping (Malay + common English terms).
// Order matters: the first rule whose keyword appears in the text wins.
const ICON_KEYWORD_RULES: { keywords: string[]; iconKey: string }[] = [
  // Rejection / not approved
  { keywords: ["tolak", "ditolak", "reject", "tidak lulus", "tak lulus", "gagal"], iconKey: "reject" },
  // High interest
  { keywords: ["faedah", "interest", "kadar", "riba"], iconKey: "percent" },
  // Hidden fees / extra charges
  { keywords: ["yuran tersembunyi", "caj tersembunyi", "hidden", "tersembunyi", "yuran tambahan", "caj tambahan"], iconKey: "hiddenFee" },
  // Money / cost / debt / commitment
  { keywords: ["mahal", "kos", "bayaran", "ansuran", "komitmen", "hutang", "duit", "wang", "harga"], iconKey: "money" },
  // Slow / takes too long
  { keywords: ["lama", "lambat", "tunggu", "masa", "slow", "perlahan"], iconKey: "clock" },
  // Privacy / data security
  { keywords: ["privasi", "rahsia", "peribadi", "data", "maklumat", "selamat"], iconKey: "lock" },
  // Trust / scam concerns
  { keywords: ["scam", "tipu", "penipuan", "amanah", "percaya", "lesen", "sah"], iconKey: "shield" },
  // Paperwork / documents
  { keywords: ["dokumen", "borang", "kertas", "salinan", "ic", "slip", "penyata"], iconKey: "document" },
  // No support / no one to talk to
  { keywords: ["sokongan", "bantu", "bantuan", "khidmat", "support", "hubungi", "tanya"], iconKey: "chat" },
  // Confused / don't know
  { keywords: ["tidak tahu", "tak tahu", "keliru", "bingung", "faham", "mana", "macam mana", "bagaimana"], iconKey: "question" },
];

function pickIcon(iconKey: string | null | undefined, text: string, idx: number) {
  // 1. Explicit CMS choice wins
  if (iconKey && CHALLENGE_ICONS[iconKey]) return CHALLENGE_ICONS[iconKey];

  // 2. Keyword match against the concern text
  const lower = text.toLowerCase();
  for (const rule of ICON_KEYWORD_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return CHALLENGE_ICONS[rule.iconKey];
    }
  }

  // 3. Fallback: cycle defaults so nothing renders blank
  return CHALLENGE_ICONS[DEFAULT_ICON_ORDER[idx % DEFAULT_ICON_ORDER.length]];
}

type ConcernPillProps = {
  text: string;
  icon: React.ReactNode;
  desktop?: boolean;
};

function ConcernPill({ text, icon, desktop = false }: ConcernPillProps) {
  const base =
    "flex items-center gap-2 rounded-full border-2 border-[#063959] bg-[#0A4A7A]/90 text-center font-medium text-white shadow-md backdrop-blur-sm";
  const sizing = desktop
    ? "px-6 py-3 lg:px-7 lg:py-3.5 lg:text-base"
    : "px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm";
  return (
    <div className={`${base} ${sizing}`}>
      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#063959]">
        {icon}
      </span>
      <span className="flex-1 text-left leading-snug">{text}</span>
    </div>
  );
}

export default function Challenges({ data }: { data: ChallengesData }) {
  const concerns = (data.concerns ?? []).map((c, idx) => ({
    text: c.text,
    icon: pickIcon(c.iconKey, c.text, idx),
  }));

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
          {data.heading}
        </h2>
        </RevealOnScroll>

        {/* Mobile view — all concerns stacked */}
        <div className="mt-4 flex flex-col items-stretch gap-2.5 sm:gap-3 lg:hidden w-full max-w-xs sm:max-w-sm mx-auto">
          {concerns.map((c, idx) => (
            <RevealOnScroll key={c.text} delay={idx * 150}>
              <ConcernPill text={c.text} icon={c.icon} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Desktop view — split left/right */}
        <div className="hidden lg:flex lg:flex-row lg:justify-center lg:gap-12 flex-1 lg:mt-40">
          <div className="flex flex-col gap-2 lg:w-1/3 lg:max-w-none lg:gap-16">
            {concerns.filter((_, i) => i % 2 === 0).map((c, idx) => (
              <RevealOnScroll key={c.text} delay={idx * 150}>
                <ConcernPill text={c.text} icon={c.icon} desktop />
              </RevealOnScroll>
            ))}
          </div>

          <div className="lg:w-1/3" />

          <div className="flex flex-col gap-2 lg:w-1/3 lg:max-w-none lg:gap-16">
            {concerns.filter((_, i) => i % 2 === 1).map((c, idx) => (
              <RevealOnScroll key={c.text} delay={(idx + 1) * 150}>
                <ConcernPill text={c.text} icon={c.icon} desktop />
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
            {data.ctaBannerText}
          </p>
        </div>
        </RevealOnScroll>
      </div>
      </div>
    </section>
  );
}
