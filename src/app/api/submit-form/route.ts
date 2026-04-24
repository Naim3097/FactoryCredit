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

export async function POST(request: Request) {
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
    const pinjamanNum = Number(jumlahPinjaman);
    if (!/^\d+$/.test(jumlahPinjaman) || pinjamanNum < 1000 || pinjamanNum > 50000) {
      return NextResponse.json({ error: "Jumlah pinjaman tidak sah." }, { status: 400 });
    }

    const umurNum = Number(umur);
    if (!/^\d+$/.test(umur) || umurNum < 21 || umurNum > 60) {
      return NextResponse.json({ error: "Umur tidak sah." }, { status: 400 });
    }

    if (!/^\d{10,12}$/.test(telefon)) {
      return NextResponse.json({ error: "No. telefon tidak sah." }, { status: 400 });
    }

    if (!BRANCH_EMAILS[cawangan]) {
      return NextResponse.json({ error: "Cawangan tidak sah." }, { status: 400 });
    }

    const branchEmail = BRANCH_EMAILS[cawangan];

    // Email (non-blocking — skip if RESEND_API_KEY not set or placeholder)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("xxxx")) {
      try {
        const resend = new Resend(resendKey);

        const htmlContent = `
          <h2>Permohonan Pinjaman Baru</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Jumlah Pinjaman</td><td style="padding:8px;border:1px solid #ddd;">RM${jumlahPinjaman}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Umur</td><td style="padding:8px;border:1px solid #ddd;">${umur} tahun</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">No. IC</td><td style="padding:8px;border:1px solid #ddd;">${noIC}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nama</td><td style="padding:8px;border:1px solid #ddd;">${nama}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">No. Telefon</td><td style="padding:8px;border:1px solid #ddd;">${telefon}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Sektor Pekerjaan</td><td style="padding:8px;border:1px solid #ddd;">${SEKTOR_LABELS[sektorPekerjaan] || sektorPekerjaan}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Gaji Kasar</td><td style="padding:8px;border:1px solid #ddd;">RM${gajiKasar}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cawangan</td><td style="padding:8px;border:1px solid #ddd;">${CAWANGAN_LABELS[cawangan] || cawangan}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Sumber Maklumat</td><td style="padding:8px;border:1px solid #ddd;">${SUMBER_LABELS[sumberInfo] || sumberInfo || "-"}</td></tr>
          </table>
        `;

        const { error: emailError } = await resend.emails.send({
          from: "Factory Credit <onboarding@resend.dev>",
          to: branchEmail,
          subject: `Permohonan Pinjaman Baru - ${nama}`,
          html: htmlContent,
          replyTo: email,
        });

        if (emailError) {
          console.error("Resend error (non-blocking):", emailError);
        }
      } catch (emailErr) {
        console.error("Resend exception (non-blocking):", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping email send.");
    }

    // Append to Google Sheet (non-blocking — don't fail the form if sheet errors)
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
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
            sektorPekerjaan: SEKTOR_LABELS[sektorPekerjaan] || sektorPekerjaan,
            gajiKasar,
            jumlahPinjaman,
            sumberInfo: SUMBER_LABELS[sumberInfo] || sumberInfo || "-",
          }),
        });
      } catch (sheetError) {
        console.error("Google Sheet error:", sheetError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ error: "Gagal menghantar borang." }, { status: 500 });
  }
}
