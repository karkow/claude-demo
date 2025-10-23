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
    name: "Caterpillar 320 Excavator",
    category: "Excavator",
    description: "Heavy-duty hydraulic excavator perfect for digging, trenching, and material handling. Ideal for construction sites and earthmoving projects.",
    specifications: {
      weight: "20,000 kg",
      capacity: "1.2 m³ bucket",
      power: "121 HP (90 kW)",
      dimensions: "9.5m x 2.8m x 3.0m (L x W x H)",
      maxReach: "9.7 m",
      fuelType: "Diesel"
    },
    dailyRate: 350,
    imageUrl: "/vehicle-images/excavator.jpg"
  },
  {
    id: "bulldozer-001",
    name: "Komatsu D65 Bulldozer",
    category: "Bulldozer",
    description: "Powerful crawler dozer for pushing, grading, and leveling terrain. Excellent for site preparation and large-scale earthmoving operations.",
    specifications: {
      weight: "19,500 kg",
      capacity: "3.6 m³ blade",
      power: "169 HP (126 kW)",
      dimensions: "5.8m x 3.7m x 3.2m (L x W x H)",
      fuelType: "Diesel"
    },
    dailyRate: 400,
    imageUrl: "/vehicle-images/bulldozer.jpg"
  },
  {
    id: "wheel-loader-001",
    name: "Volvo L90H Wheel Loader",
    category: "Wheel Loader",
    description: "Versatile front-end loader for loading, moving, and transporting materials. Perfect for construction sites, quarries, and landscaping.",
    specifications: {
      weight: "14,800 kg",
      capacity: "2.8 m³ bucket",
      power: "183 HP (136 kW)",
      dimensions: "7.5m x 2.6m x 3.4m (L x W x H)",
      maxReach: "3.2 m",
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
