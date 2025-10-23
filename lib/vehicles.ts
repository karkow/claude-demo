export interface Vehicle {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: {
    weight?: string;
    capacity?: string;
    power?: string;
    dimensions?: string;
    maxReach?: string;
    fuelType?: string;
    [key: string]: string | undefined;
  };
  dailyRate: number;
  imageUrl?: string;
}

export interface RentalContract {
  vehicleId: string;
  vehicleName: string;
  firstName: string;
  lastName: string;
  signature: string; // Base64 data URL
  date: string; // ISO format
  dailyRate: number;
}

// Dummy vehicle data
export const vehicles: Vehicle[] = [
  {
    id: "excavator-001",
    name: "Caterpillar 320 Bagger",
    category: "Bagger",
    description: "Hydraulikbagger für Schwerstarbeiten, perfekt zum Graben, für Grabarbeiten und Materialumschlag. Ideal für Baustellen und Erdbewegungsprojekte.",
    specifications: {
      weight: "20.000 kg",
      capacity: "1,2 m³ Schaufel",
      power: "121 PS (90 kW)",
      dimensions: "9,5m x 2,8m x 3,0m (L x B x H)",
      maxReach: "9,7 m",
      fuelType: "Diesel"
    },
    dailyRate: 350,
    imageUrl: "/vehicle-images/excavator.jpg"
  },
  {
    id: "bulldozer-001",
    name: "Komatsu D65 Planierraupe",
    category: "Planierraupe",
    description: "Leistungsstarke Kettendozer zum Schieben, Planieren und Nivellieren von Gelände. Hervorragend geeignet für Geländevorbereitung und großflächige Erdbewegungsarbeiten.",
    specifications: {
      weight: "19.500 kg",
      capacity: "3,6 m³ Schild",
      power: "169 PS (126 kW)",
      dimensions: "5,8m x 3,7m x 3,2m (L x B x H)",
      fuelType: "Diesel"
    },
    dailyRate: 400,
    imageUrl: "/vehicle-images/bulldozer.jpg"
  },
  {
    id: "wheel-loader-001",
    name: "Volvo L90H Radlader",
    category: "Radlader",
    description: "Vielseitiger Frontlader zum Beladen, Bewegen und Transportieren von Materialien. Perfekt für Baustellen, Steinbrüche und Landschaftsbau.",
    specifications: {
      weight: "14.800 kg",
      capacity: "2,8 m³ Schaufel",
      power: "183 PS (136 kW)",
      dimensions: "7,5m x 2,6m x 3,4m (L x B x H)",
      maxReach: "3,2 m",
      fuelType: "Diesel"
    },
    dailyRate: 320,
    imageUrl: "/vehicle-images/wheel-loader.jpg"
  }
];

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(vehicle => vehicle.id === id);
}

export function getAllVehicles(): Vehicle[] {
  return vehicles;
}
