import { VehicleCard } from "@/components/vehicle-card";
import { getAllVehicles } from "@/lib/vehicles";
import { Construction } from "lucide-react";

export default function Home() {
  const vehicles = getAllVehicles();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Construction className="h-6 w-6" />
            <h1 className="text-lg font-bold md:text-xl">ConstructRent</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">
            Verfügbare Baufahrzeuge
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Wählen Sie ein Fahrzeug aus, um Details anzuzeigen und zu mieten
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>
    </div>
  );
}
