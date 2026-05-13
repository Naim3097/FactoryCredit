import Link from "next/link";
import Image from "next/image";
import type { FooterData } from "@/types/cms";

const WhatsAppIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z" />
    <path d="M20.5 3.5A10.5 10.5 0 003.4 16.7L2 22l5.4-1.4A10.5 10.5 0 1020.5 3.5zM12 20.1c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.6 8.6 0 116.7 4z" />
  </svg>
);

const FacebookIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.6 7.6a6.5 6.5 0 01-3.8-1.2v8.4a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 102 2.6V2h2.8a3.7 3.7 0 003.7 3.7v2z" />
  </svg>
);

type SocialLink = { href: string; label: string; icon: React.ReactNode };

// Per-branch social media URLs. Matched against the branch's `name` field
// (case-insensitive substring). Override CMS / placeholder values.
const BRANCH_SOCIAL_OVERRIDES: {
  match: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}[] = [
  {
    match: "kuching",
    facebookUrl: "https://www.facebook.com/factorycreditbtl",
    instagramUrl: "https://www.instagram.com/factorycredithq",
    tiktokUrl: "https://www.tiktok.com/@factorysatokfml",
  },
  {
    match: "samarahan",
    facebookUrl: "https://www.facebook.com/factorysamarahan",
    instagramUrl: "https://www.instagram.com/factory.credit",
    tiktokUrl: "https://www.tiktok.com/@fks.credit",
  },
  {
    match: "bintulu",
    facebookUrl: "https://www.facebook.com/factorycreditbtl",
    instagramUrl: "https://www.instagram.com/factorycredit.bintulu",
    tiktokUrl: "https://www.tiktok.com/@fbintulu.cre",
  },
];

function resolveBranchSocials(
  branchName: string,
  fromCms: {
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
  },
) {
  const lower = branchName.toLowerCase();
  const override = BRANCH_SOCIAL_OVERRIDES.find((o) => lower.includes(o.match));
  return {
    facebookUrl: override?.facebookUrl ?? fromCms.facebookUrl ?? null,
    instagramUrl: override?.instagramUrl ?? fromCms.instagramUrl ?? null,
    tiktokUrl: override?.tiktokUrl ?? fromCms.tiktokUrl ?? null,
  };
}

function BranchSocials({
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  branchName,
}: {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  branchName: string;
}) {
  // Always show all three icons. Use "#" as a placeholder until real URLs are wired in.
  const links: SocialLink[] = [
    {
      href: facebookUrl || "#",
      label: `Facebook ${branchName}`,
      icon: <FacebookIcon />,
    },
    {
      href: instagramUrl || "#",
      label: `Instagram ${branchName}`,
      icon: <InstagramIcon />,
    },
    {
      href: tiktokUrl || "#",
      label: `TikTok ${branchName}`,
      icon: <TikTokIcon />,
    },
  ];
  return (
    <div className="mt-2 flex items-center gap-2">
      {links.map((l) => {
        const isPlaceholder = l.href === "#";
        return (
          <a
            key={l.label}
            href={l.href}
            target={isPlaceholder ? undefined : "_blank"}
            rel={isPlaceholder ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            {l.icon}
          </a>
        );
      })}
    </div>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const branches = data.branches ?? [];
  const operatingHours = data.operatingHours ?? [];

  return (
    <footer
      id="kontack"
      className="bg-[#009ed6] text-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 sm:gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Factory Credit"
                width={160}
                height={40}
                className="h-8 w-auto brightness-0 invert"
                loading="lazy"
              />
            </div>
            <p className="text-xs leading-relaxed text-white/80">
              {data.companyDescription}
            </p>
          </div>

          {/* License info */}
          <div>
            <p className="mb-3 text-sm font-bold">Nombor lesen</p>
            <p className="text-xs text-white/80">{data.license.number}</p>
            <p className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku lesen
            </p>
            <p className="text-xs text-white/80">{data.license.validity}</p>
            <p className="mb-1 mt-4 text-sm font-bold">Nombor permit iklan</p>
            <p className="text-xs text-white/80">{data.license.adPermitNumber}</p>
            <p className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku permit iklan
            </p>
            <p className="text-xs text-white/80">{data.license.adPermitValidity}</p>
          </div>

          {/* Operating hours */}
          <div>
            <p className="mb-3 text-sm font-bold">Waktu Operasi</p>
            <div className="space-y-1 text-xs text-white/80">
              {operatingHours.map((h) => (
                <p key={h.id ?? h.text}>{h.text}</p>
              ))}
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-sm font-bold">Khidmat Pelanggan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b) => {
                const socials = resolveBranchSocials(b.name, {
                  facebookUrl: b.facebookUrl,
                  instagramUrl: b.instagramUrl,
                  tiktokUrl: b.tiktokUrl,
                });
                return (
                <div key={b.id ?? b.name}>
                  <p className="text-xs font-bold">{b.name}</p>
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs text-white/80 underline hover:text-white transition-colors"
                  >
                    {b.address}
                  </a>
                  <a
                    href={`https://wa.me/${b.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${b.name} di ${b.phoneDisplay}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-white/80 transition-colors"
                  >
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-white"
                      aria-hidden="true"
                    >
                      <WhatsAppIcon className="h-3 w-3" />
                    </span>
                    {b.phoneDisplay}
                  </a>
                  <BranchSocials
                    facebookUrl={socials.facebookUrl}
                    instagramUrl={socials.instagramUrl}
                    tiktokUrl={socials.tiktokUrl}
                    branchName={b.name}
                  />
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-2 px-5 py-4 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>{data.copyrightText}</p>
          <div className="flex gap-4">
            <Link href={data.legalLinks.privacyUrl} className="hover:text-white transition-colors">
              Dasar Privasi
            </Link>
            <Link href={data.legalLinks.disclaimerUrl} className="hover:text-white transition-colors">
              Kenyataan Penafian
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
