import Link from "next/link";

export default function ServicesPage() {
  const pricingTiers = [
    {
      name: "MOT Testing",
      price: "£45",
      description: "Class 4 & 7 MOTs. Fast, fair, and fully certified.",
      features: [
        "DVSA Approved",
        "Free Retest within 10 days",
        "While-you-wait service",
      ],
      popular: false,
    },
    {
      name: "Interim Service",
      price: "From £99",
      description: "Ideal for high-mileage drivers needing a mid-year checkup.",
      features: [
        "Oil & Filter Change",
        "Fluid Top-ups",
        "50-Point Visual Health Check",
      ],
      popular: false,
    },
    {
      name: "Full Service",
      price: "From £189",
      description:
        "Our comprehensive annual service to keep your warranty intact.",
      features: [
        "Everything in Interim",
        "Air & Cabin Filters",
        "Spark Plugs / Fuel Filter",
        "Full Diagnostic Scan",
      ],
      popular: true, // We highlight this one!
    },
    {
      name: "Diagnostics",
      price: "£50",
      description: "Dealer-level fault finding and dashboard light resets.",
      features: [
        "Engine Light Check",
        "Battery & Alternator Test",
        "Printed Fault Report",
      ],
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Transparent Pricing. No Surprises.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We believe in honest work for honest pay. Select a service below or
            contact us for custom repair quotes.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border p-8 flex flex-col transition hover:-translate-y-1 ${
                tier.popular
                  ? "border-red-500 shadow-red-100/50"
                  : "border-slate-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-500 text-sm h-10">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">
                  {tier.price}
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-slate-700 font-medium"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`w-full py-3 rounded-md font-bold text-center transition ${
                  tier.popular
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* Custom Work Section */}
        <div className="mt-20 bg-slate-900 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need something else?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            From clutch replacements to timing belts, our expert mechanics
            handle it all. Give us a call to get a direct quote for your
            specific vehicle.
          </p>
          <a
            href="tel:01234567890"
            className="inline-block bg-white text-slate-900 font-bold px-8 py-3 rounded-md hover:bg-slate-100 transition"
          >
            Call 01234 567 890
          </a>
        </div>
      </div>
    </main>
  );
}
