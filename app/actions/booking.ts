"use server";

// 1. FIXED: Using a foolproof relative path instead of the '@' shortcut
import { prisma } from "../../lib/prisma";

export async function createBooking(formData: {
  reg: string;
  service: string;
  date: string;
  name: string;
  phone: string;
}) {
  try {
    if (
      !formData.reg ||
      !formData.service ||
      !formData.date ||
      !formData.name ||
      !formData.phone
    ) {
      return { error: "Please fill out all required fields." };
    }

    const newBooking = await prisma.booking.create({
      data: {
        reg: formData.reg,
        service: formData.service,
        date: new Date(formData.date),
        name: formData.name,
        phone: formData.phone,
      },
    });

    return { success: true, id: newBooking.id };
  } catch (error) {
    // 2. FIXED: Removed 'any' and cast the error safely for strict TypeScript
    const prismaError = error as { code?: string };

    if (prismaError.code === "P2002") {
      return {
        error:
          "Sorry, this service is already fully booked for that exact date. Please select another day.",
      };
    }

    return { error: "A server error occurred. Please try again." };
  }
}
