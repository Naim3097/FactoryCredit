import { NextResponse } from "next/server";
import { Resend } from "resend";

const BRANCH_EMAILS: Record<string, string> = {
  satok: "kuching@factorycredit.com.my",
  samarahan: "ks@factorycredit.com.my",
  bintulu: "bintulu@factorycredit.com.my",
};

const SEKTOR_LABELS: Record<string, string> = {
  "penjawat-awam": "Penjawat Awam",
  "pekerja-glc": "Pekerja GLC",
  "pekerja-swasta": "Pekerja Swasta",
  "bekerja-sendiri": "Bekerja Sendiri",
  freelance: "Freelance/Pekerja Gig",
  pelajar: "Pelajar",
};

const CAWANGAN_LABELS: Record<string, string> = {
  satok: "Satok, Kuching",
  samarahan: "Kota Samarahan",
  bintulu: "Bintulu",
};

const SUMBER_LABELS: Record<string, string> = {
  "iklan-fb-ig": "Iklan Facebook / Instagram",
  "post-fb-ig": "Facebook / Instagram post (Bukan iklan)",
  google: "Pencarian Google",
  rujukan: "Rujukan Rakan / Keluarga",
  "walk-in": "Walk In",
  "lain-lain": "Lain-lain",
};

// Best-effort in-memory rate limiter. Survives within a warm Vercel function
// instance; cold starts reset the window. For higher-volume traffic, swap to
// Upstash/Vercel KV.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

const escapeHtml = (s: unknown): string =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

const sanitizeHeader = (s: unknown): string =>
  String(s ?? "").replace(/[\r\n]+/g, " ").slice(0, 200);

const isValidEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permohonan. Sila cuba sebentar lagi." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const {
      jumlahPinjaman,
      umur,
      noIC,
      nama,
      email,
      telefon,
      sektorPekerjaan,
      gajiKasar,
      cawangan,
      sumberInfo,
    } = body;

    // Server-side validation
    if (typeof jumlahPinjaman !== "string" || !/^\d+$/.test(jumlahPinjaman)) {
      return NextResponse.json({ error: "Jumlah pinjaman tidak sah." }, { status: 400 });
    }
    const pinjamanNum = Number(jumlahPinjaman);
    if (pinjamanNum < 1000 || pinjamanNum > 50000) {
      return NextResponse.json({ error: "Jumlah pinjaman tidak sah." }, { status: 400 });
    }

    if (typeof umur !== "string" || !/^\d+$/.test(umur)) {
      return NextResponse.json({ error: "Umur tidak sah." }, { status: 400 });
    }
    const umurNum = Number(umur);
    if (umurNum < 21 || umurNum > 60) {
      return NextResponse.json({ error: "Umur tidak sah." }, { status: 400 });
    }

    if (typeof noIC !== "string" || !/^\d{12}$/.test(noIC)) {
      return NextResponse.json({ error: "No. IC tidak sah." }, { status: 400 });
    }

    if (typeof nama !== "string" || nama.trim().length === 0 || nama.length > 100 || /\d/.test(nama)) {
      return NextResponse.json({ error: "Nama tidak sah." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email tidak sah." }, { status: 400 });
    }

    if (typeof telefon !== "string" || !/^\d{10,12}$/.test(telefon)) {
      return NextResponse.json({ error: "No. telefon tidak sah." }, { status: 400 });
    }

    if (typeof sektorPekerjaan !== "string" || !SEKTOR_LABELS[sektorPekerjaan]) {
      return NextResponse.json({ error: "Sektor pekerjaan tidak sah." }, { status: 400 });
    }

    if (typeof gajiKasar !== "string" || !/^\d+$/.test(gajiKasar) || Number(gajiKasar) < 2000) {
      return NextResponse.json({ error: "Gaji kasar tidak sah." }, { status: 400 });
    }

    if (typeof cawangan !== "string" || !BRANCH_EMAILS[cawangan]) {
      return NextResponse.json({ error: "Cawangan tidak sah." }, { status: 400 });
    }

    if (typeof sumberInfo !== "string" || !SUMBER_LABELS[sumberInfo]) {
      return NextResponse.json({ error: "Sumber maklumat tidak sah." }, { status: 400 });
    }

    const branchEmail = BRANCH_EMAILS[cawangan];

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("xxxx")) {
      try {
        const resend = new Resend(resendKey);

        const htmlContent = `
          <h2>Permohonan Pinjaman Baru</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Jumlah Pinjaman</td><td style="padding:8px;border:1px solid #ddd;">RM${escapeHtml(jumlahPinjaman)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Umur</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(umur)} tahun</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">No. IC</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(noIC)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nama</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(nama)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">No. Telefon</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(telefon)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Sektor Pekerjaan</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(SEKTOR_LABELS[sektorPekerjaan])}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Gaji Kasar</td><td style="padding:8px;border:1px solid #ddd;">RM${escapeHtml(gajiKasar)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cawangan</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(CAWANGAN_LABELS[cawangan])}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Sumber Maklumat</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(SUMBER_LABELS[sumberInfo])}</td></tr>
          </table>
        `;

        const { error: emailError } = await resend.emails.send({
          from: "Factory Credit <onboarding@resend.dev>",
          to: branchEmail,
          subject: `Permohonan Pinjaman Baru - ${sanitizeHeader(nama)}`,
          html: htmlContent,
          replyTo: email,
        });

        if (emailError) {
          console.error("submit-form: resend send failed", emailError.message ?? emailError.name);
        }
      } catch (emailErr) {
        console.error(
          "submit-form: resend threw",
          emailErr instanceof Error ? emailErr.message : "unknown"
        );
      }
    } else {
      console.warn("submit-form: RESEND_API_KEY not configured, skipping email");
    }

    const BRANCH_SHEET_URLS: Record<string, string | undefined> = {
      satok: process.env.GOOGLE_SHEET_WEBHOOK_URL_SATOK,
      samarahan: process.env.GOOGLE_SHEET_WEBHOOK_URL_SAMARAHAN,
      bintulu: process.env.GOOGLE_SHEET_WEBHOOK_URL_BINTULU,
    };
    const sheetUrl = BRANCH_SHEET_URLS[cawangan] || process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cawangan,
            nama,
            noIC,
            telefon,
            email,
            umur,
            sektorPekerjaan: SEKTOR_LABELS[sektorPekerjaan],
            gajiKasar,
            jumlahPinjaman,
            sumberInfo: SUMBER_LABELS[sumberInfo],
          }),
        });
      } catch (sheetError) {
        console.error(
          "submit-form: sheet webhook failed",
          sheetError instanceof Error ? sheetError.message : "unknown"
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "submit-form: unexpected error",
      error instanceof Error ? error.message : "unknown"
    );
    return NextResponse.json({ error: "Gagal menghantar borang." }, { status: 500 });
  }
}
