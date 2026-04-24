import Link from "next/link";
import Image from "next/image";

const branches = [
  {
    name: "Satok Branch",
    address:
      "Lot 538, Ground Floor, Section 6, KTLD, Jalan Satok, 93400 Kuching, Sarawak",
    phone: "0162072017",
    phoneDisplay: "0162072017 (WS)",
      mapUrl: "https://www.google.com/maps/place/Factory+Credit+Sdn.+Bhd.+(Satok)/@1.553515,110.3333484,17z/data=!3m1!4b1!4m6!3m5!1s0x31fba7f18394e519:0x8fbeb808e973ba3!8m2!3d1.553515!4d110.3333484!16s%2Fg%2F11qt2m_m6k!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
    wa: "60162072017",
  },
  {
    name: "Kota Samarahan Branch",
    address:
      "1st Floor, No. 8 Lot 5604, Kuching - Samarahan Expressway, Taman Uni Square, 94300 Kota Samarahan, Sarawak",
    phone: "0168868794",
    phoneDisplay: "0168868794 (WS)",
      mapUrl: "https://www.google.com/maps/place/Factory+Credit+Sdn.+Bhd.+(Kota+Samarahan)/@1.4647709,110.4148641,17z/data=!3m1!4b1!4m6!3m5!1s0x31fba17909839e8b:0x602fcb89a3de775!8m2!3d1.4647709!4d110.417439!16s%2Fg%2F11cjhzgqb0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
    wa: "60168868794",
  },
  {
    name: "Bintulu Branch",
    address:
      "1st Floor, Junction 28 Jalan Keppel Bintulu, Lot 4499 Bintulu Town District, 97000 Bintulu, Sarawak",
    phone: "0143001881",
    phoneDisplay: "0143001881 (WS)",
      mapUrl: "https://www.google.com/maps/place/Factory+Credit+Sdn.+Bhd.+(Bintulu)/@3.1726755,113.0375817,17z/data=!3m1!4b1!4m6!3m5!1s0x321dc163b87656d7:0xa108ba467a5d74e4!8m2!3d3.1726755!4d113.0401566!16s%2Fg%2F11xgy5f087!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
    wa: "60143001881",
  },
];

export default function Footer() {
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
              Factory Credit Sdn. Bhd. (201001002306 (886884-P)) ialah sebuah
              agensi pinjaman berlesen di bawah Akta Pemberi Pinjam Wang 1951
              yang dikawal selia oleh Kementerian Perumahan dan Kerajaan
              Tempatan (KPKT). Kami beroperasi dengan cawangan di Kuching, Kota
              Samarahan dan Bintulu.
            </p>
          </div>

          {/* License info */}
          <div>
            <p className="mb-3 text-sm font-bold">Nombor lesen</p>
            <p className="text-xs text-white/80">RBK/PPW/95/2024/0008</p>
            <p className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku lesen
            </p>
            <p className="text-xs text-white/80">20/4/2026</p>
            <p className="mb-1 mt-4 text-sm font-bold">Nombor permit iklan</p>
            <p className="text-xs text-white/80">RBK/PPW/IK/95/2024/0008</p>
            <p className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku permit iklan
            </p>
            <p className="text-xs text-white/80">20/4/2026</p>
          </div>

          {/* Operating hours */}
          <div>
            <p className="mb-3 text-sm font-bold">Waktu Operasi</p>
            <div className="space-y-1 text-xs text-white/80">
              <p>Isnin - Jumaat: 8:30am - 5:30pm</p>
              <p>Sabtu: 8:30am - 12:30pm</p>
              <p>Ahad dan Cuti Umum: Tutup</p>
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-sm font-bold">Khidmat Pelanggan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b) => (
                <div key={b.name}>
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
          <p>
            © Copyright 2026, Factory Credit Sdn. Bhd. [Registration No. 201001002306 (886884-P)]. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://factorycredit.com.my/privacy-policy" className="hover:text-white transition-colors">
              Dasar Privasi
            </Link>
            <Link href="https://factorycredit.com.my/disclaimer-notice" className="hover:text-white transition-colors">
              Kenyataan Penafian
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
