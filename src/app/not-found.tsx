import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-gray-700">
        Halaman tidak dijumpai
      </p>
      <p className="mt-2 text-gray-500">
        Maaf, halaman yang anda cari tidak wujud.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Kembali ke Laman Utama
      </Link>
    </main>
  );
}
