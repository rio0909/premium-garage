// 1. Moved the StarIcon OUTSIDE the main component so it only renders once!
const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function GoogleReviews() {
  const reviews = [
    {
      name: "David Mitchell",
      date: "2 weeks ago",
      text: "Absolutely fantastic service. Brought my Audi in for a full service and MOT. No hidden fees, great communication, and the car drives like new. Highly recommend!",
    },
    {
      name: "Sarah Jenkins",
      date: "1 month ago",
      text: "My engine light came on during the school run. The team managed to fit me in the same day, diagnosed the issue within 20 minutes, and had it fixed by the afternoon.",
    },
    {
      name: "Marcus Thorne",
      date: "2 months ago",
      text: "Honest mechanics are hard to find, but these guys are the real deal. Quoted me £150 less than the main dealer for a brake pad replacement. Will be coming back.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by Local Drivers
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-600">
            <span>Excellent</span>
            <div className="flex">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <span>4.9/5 on Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative"
            >
              <div className="absolute top-8 right-8 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-xs">
                G
              </div>

              <div className="flex mb-4">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              {/* 2. Fixed the unescaped quotes by using &quot; */}
              <p className="text-slate-700 leading-relaxed mb-6 italic">
                &quot;{review.text}&quot;
              </p>
              <div>
                <p className="font-bold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
