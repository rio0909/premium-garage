import Link from "next/link";
import RegLookup from "@/components/features/RegLookup";
import GoogleReviews from "@/components/features/GoogleReviews"; // <-- ADD THIS LINE

// Services data array to map over for the grid
const services = [
  {
    title: "MOT Testing",
    description: "Class 4 & 7 MOTs. Fast, fair, and fully certified.",
    icon: (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Full Servicing",
    description: "Interim and major servicing to keep your warranty intact.",
    icon: (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Engine Diagnostics",
    description: "Dealer-level fault finding and dashboard light resets.",
    icon: (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Tyres & Brakes",
    description:
      "Premium and budget options fitted while you wait in the lounge.",
    icon: (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. The Hero Section */}
      <section className="bg-slate-800 text-white py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Honest Mechanics.{" "}
            <span className="text-red-500">Fast Turnarounds.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10">
            From emergency repairs to your annual MOT, we get you back on the
            road safely without the main dealer price tag.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/booking"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-md font-bold text-lg transition"
            >
              Book a Service
            </Link>
            <Link
              href="/services"
              className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-md font-bold text-lg transition"
            >
              View Prices
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE REG LOOKUP COMPONENT */}
      <RegLookup />

      {/* 3. The Services Grid */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything your car needs.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer comprehensive repair and maintenance for all makes and
              models, using OEM-quality parts.
            </p>
          </div>

          {/* The CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-100 p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="bg-red-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 4. THE GOOGLE REVIEWS COMPONENT */}
      <GoogleReviews />
    </main>
  );
}
