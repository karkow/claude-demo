"use client";

import { use } from "react";
import Link from "next/link";
import { getVehicleById } from "@/lib/vehicles";
import { VehicleDetails } from "@/components/vehicle-details";
import { RentalForm } from "@/components/rental-form";
import { generatePDF } from "@/lib/pdf-generator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function VehiclePage({ params }: PageProps) {
  const { id } = use(params);
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <Construction className="h-6 w-6" />
              <h1 className="text-lg font-bold md:text-xl">ConstructRent</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Vehicle Not Found</h2>
            <p className="text-muted-foreground">
              The vehicle you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Vehicles
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (data: {
    firstName: string;
    lastName: string;
    signature: string;
  }) => {
    // Generate PDF
    await generatePDF({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleCategory: vehicle.category,
      vehicleSpecifications: vehicle.specifications,
      firstName: data.firstName,
      lastName: data.lastName,
      signature: data.signature,
      date: new Date().toISOString(),
      dailyRate: vehicle.dailyRate,
    });

    // Optional: Show success message or redirect
    // For now, we'll just stay on the page as the PDF downloads
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Construction className="h-6 w-6" />
            <h1 className="text-lg font-bold md:text-xl">ConstructRent</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Vehicles
            </Link>
          </Button>

          {/* Vehicle Details */}
          <VehicleDetails vehicle={vehicle} />

          {/* Rental Form */}
          <div>
            <h2 className="text-xl font-bold mb-4">Complete Your Rental</h2>
            <RentalForm vehicle={vehicle} onSubmit={handleSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
}
