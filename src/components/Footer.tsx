import Link from "next/link";
import Image from "next/image";

const branches = [
  {
    name: "Satok Branch",
    address:
      "Lot 538, Ground Floor, Section 6, KTLD, Jalan Satok, 93400 Kuching, Sarawak",
    phone: "0162072017 (WS)",
  },
  {
    name: "Miri Branch",
    address:
      "No. 1151, 1st Floor, Miri Waterfront, Jalan Sri Dagang, 98000 Miri, Sarawak",
    phone: "0103641788 (WS)",
  },
  {
    name: "Kota Samarahan Branch",
    address:
      "1st Floor, No. 8 Lot 5604, Kuching - Samarahan Expressway, Taman Uni Square, 94300 Kota Samarahan, Sarawak",
    phone: "0168868794 (WS)",
  },
  {
    name: "Bintulu Branch",
    address:
      "1st Floor, Junction 28 Jalan Keppel Bintulu, Lot 4499 Bintulu Town District, 97000 Bintulu, Sarawak",
    phone: "0143001881 (WS)",
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
              Samarahan, Miri dan Bintulu.
            </p>
          </div>

          {/* License info */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Nombor lesen</h3>
            <p className="text-xs text-white/80">RBK/PPW/95/2024/0008</p>
            <h3 className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku lesen
            </h3>
            <p className="text-xs text-white/80">20/4/2026</p>
            <h3 className="mb-1 mt-4 text-sm font-bold">Nombor permit iklan</h3>
            <p className="text-xs text-white/80">RBK/PPW/IK/95/2024/0008</p>
            <h3 className="mb-1 mt-4 text-sm font-bold">
              Tempoh sah laku permit iklan
            </h3>
            <p className="text-xs text-white/80">20/4/2026</p>
          </div>

          {/* Operating hours */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Waktu Operasi</h3>
            <div className="space-y-1 text-xs text-white/80">
              <p>Isnin - Jumaat: 8am - 5pm</p>
              <p>Sabtu: 8am - 1pm</p>
              <p>Ahad dan Cuti Umum Tutup</p>
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-sm font-bold">Khidmat Pelanggan</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b) => (
                <div key={b.name}>
                  <p className="text-xs font-bold">{b.name}</p>
                  <p className="mt-1 text-xs text-white/80 underline">
                    {b.address}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {b.phone}
                  </p>
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
            © Copyright 2026 Factory Credit Sdn. Bhd. [Registration No. 2]. All
            Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Dasar Privasi
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Kenyataan Penafian
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
