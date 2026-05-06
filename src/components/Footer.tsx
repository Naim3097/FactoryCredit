import Link from "next/link";
import Image from "next/image";

type FooterData = {
  companyDescription: string;
  license: {
    number: string;
    validity: string;
    adPermitNumber: string;
    adPermitValidity: string;
  };
  operatingHours?: { text: string; id?: string | null }[] | null;
  branches?: {
    name: string;
    address: string;
    phoneDisplay: string;
    wa: string;
    mapUrl: string;
    id?: string | null;
  }[] | null;
  copyrightText: string;
  legalLinks: { privacyUrl: string; disclaimerUrl: string };
};

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
              {branches.map((b) => (
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
                    className="mt-1 inline-block text-xs font-bold text-white hover:text-white/80 transition-colors"
                  >
                    {b.phoneDisplay}
                  </a>
                </div>
              ))}
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
