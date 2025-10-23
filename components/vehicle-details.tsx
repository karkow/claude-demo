import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vehicle } from "@/lib/vehicles";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <Card>
      {vehicle.imageUrl && (
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-lg">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.name} - ${vehicle.category} heavy equipment rental`}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl mb-2">
              {vehicle.name}
            </CardTitle>
            <CardDescription className="text-base">
              {vehicle.category}
            </CardDescription>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl md:text-4xl font-bold">${vehicle.dailyRate}</p>
            <p className="text-sm text-muted-foreground">per day</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{vehicle.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(vehicle.specifications)
              .filter(([, value]) => value)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
