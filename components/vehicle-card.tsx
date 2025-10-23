import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden p-0 border-0">
      {vehicle.imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.name} - ${vehicle.category} available for rent`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 384px"
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg md:text-xl mb-1">{vehicle.name}</CardTitle>
            <CardDescription className="text-sm">{vehicle.category}</CardDescription>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold">${vehicle.dailyRate}</p>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {vehicle.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {vehicle.specifications.power && (
            <div>
              <span className="font-medium">Power:</span>
              <br />
              {vehicle.specifications.power}
            </div>
          )}
          {vehicle.specifications.weight && (
            <div>
              <span className="font-medium">Weight:</span>
              <br />
              {vehicle.specifications.weight}
            </div>
          )}
          {vehicle.specifications.capacity && (
            <div>
              <span className="font-medium">Capacity:</span>
              <br />
              {vehicle.specifications.capacity}
            </div>
          )}
          {vehicle.specifications.fuelType && (
            <div>
              <span className="font-medium">Fuel:</span>
              <br />
              {vehicle.specifications.fuelType}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full h-12 text-base" size="lg">
          <Link href={`/vehicles/${vehicle.id}`}>
            View Details
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
