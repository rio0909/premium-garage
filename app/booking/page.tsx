"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createBooking } from "@/app/actions/booking"; // THE NEW IMPORT

function BookingWizard() {
  const searchParams = useSearchParams();
  const prefilledReg = searchParams.get("reg") || "";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    reg: prefilledReg,
    service: "",
    date: "",
    name: "",
    phone: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // THE NEW DATABASE SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError("");

    const result = await createBooking(formData);

    if (result?.error) {
      setServerError(result.error);
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
    }
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-green-500 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-slate-600 mb-8">
          We have secured your slot. Our mechanics will see you soon.
        </p>
        <Link
          href="/"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-md transition"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-slate-100 relative">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm font-bold text-slate-500 hover:text-red-600 mb-4 inline-block transition"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Book Your Appointment
        </h1>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <span className={step >= 1 ? "text-red-600" : ""}>1. Vehicle</span>
          <span>&rarr;</span>
          <span className={step >= 2 ? "text-red-600" : ""}>2. Service</span>
          <span>&rarr;</span>
          <span className={step >= 3 ? "text-red-600" : ""}>3. Details</span>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
        {/* STEP 1: VEHICLE REGISTRATION */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900">
              What vehicle are we looking at?
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.reg}
                onChange={(e) =>
                  updateForm("reg", e.target.value.toUpperCase())
                }
                placeholder="ENTER REG"
                className="w-full bg-yellow-400 text-slate-900 font-bold text-2xl tracking-widest px-4 py-4 rounded-md border-2 border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 uppercase"
                required
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.reg}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-md transition disabled:opacity-50"
            >
              Next Step &rarr;
            </button>
          </div>
        )}

        {/* STEP 2: SERVICE SELECTION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900">
              What do you need done?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "MOT Only",
                "Interim Service",
                "Full Service",
                "Diagnostics / Repair",
              ].map((svc) => (
                <button
                  key={svc}
                  type="button"
                  onClick={() => updateForm("service", svc)}
                  className={`p-4 rounded-lg border-2 text-left font-semibold transition ${
                    formData.service === svc
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-700 hover:border-red-300 hover:bg-slate-50"
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.service}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-md transition disabled:opacity-50"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & DATE */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900">
              When should we expect you?
            </h2>

            {serverError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md font-semibold text-sm">
                {serverError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateForm("date", e.target.value)}
                className="w-full bg-white text-slate-900 border-2 border-slate-200 px-4 py-3 rounded-md focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  className="w-full bg-white text-slate-900 border-2 border-slate-200 px-4 py-3 rounded-md focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  className="w-full bg-white text-slate-900 border-2 border-slate-200 px-4 py-3 rounded-md focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md transition shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <Suspense
        fallback={
          <div className="text-center mt-20 text-slate-500 font-bold">
            Loading booking engine...
          </div>
        }
      >
        <BookingWizard />
      </Suspense>
    </main>
  );
}
