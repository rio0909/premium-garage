import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reg } = body;

    // 1. Check if they typed anything
    if (!reg) {
      return NextResponse.json(
        { error: "Please enter a registration number." },
        { status: 400 },
      );
    }

    // 2. Simulate a failed search if they literally type "ERROR"
    if (reg === "ERROR") {
      return NextResponse.json(
        { error: "Vehicle not found. Please check your logbook." },
        { status: 404 },
      );
    }

    // 3. Simulate a successful DVLA database hit
    const mockVehicleData = {
      make: "FORD",
      model: "FIESTA TITANIUM",
      year: "2019",
      color: "BLUE",
      engine: "1.0L EcoBoost",
    };

    return NextResponse.json(mockVehicleData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
