import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LOGO & TEXT SECTION */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/autopro.png"
                alt="AutoPro Garage Emblem"
                width={55}
                height={55}
                className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                priority
              />
              <div className="font-bold text-2xl tracking-wider">
                AUTO<span className="text-red-500">PRO</span>
              </div>
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            <a
              href="tel:01234567890"
              className="hidden md:flex items-center text-sm font-semibold hover:text-red-400 transition"
            >
              Emergency: 01234 567 890
            </a>
            <Link
              href="/booking"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-bold transition shadow-lg"
            >
              Book MOT
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
