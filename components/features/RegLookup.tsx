"use client";

import { useState } from "react";
import Link from "next/link"; // 1. Added the Next.js Link import

type VehicleData = {
  make: string;
  model: string;
  year: string;
  color: string;
  engine: string;
};

export default function RegLookup() {
  const [reg, setReg] = useState("");
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVehicle(null);

    try {
      const res = await fetch("/api/dvla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setVehicle(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto -mt-16 relative z-10 border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Book Your Service
      </h3>
      <p className="text-slate-600 mb-6">
        Enter your registration to get started.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value.toUpperCase())}
          placeholder="ENTER REG"
          className="w-full bg-yellow-400 text-slate-900 font-bold text-2xl tracking-widest px-4 py-3 rounded-md border-2 border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 uppercase"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-md transition disabled:opacity-50"
        >
          {loading ? "..." : "Find"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm font-semibold">
          {error}
        </div>
      )}

      {vehicle && (
        <div className="mt-6 p-4 border-2 border-green-500 bg-green-50 rounded-md text-left">
          <p className="text-green-800 font-bold mb-1">Vehicle Found!</p>
          <p className="text-slate-800 font-semibold text-lg">
            {vehicle.color} {vehicle.make} {vehicle.model}
          </p>
          <p className="text-slate-600 text-sm">
            {vehicle.year} • {vehicle.engine}
          </p>

          {/* 2. Changed from <button> to <Link> to push the URL parameter */}
          <Link
            href={`/booking?reg=${reg}`}
            className="mt-4 w-full flex justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
          >
            Continue to Booking &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
