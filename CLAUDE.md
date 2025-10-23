# Development Guidelines for Claude Code

This document contains development guidelines, architecture decisions, and best practices for the Construction Vehicle Rental Platform.

## Project Architecture

### Design Philosophy

**Mobile-First Approach**
- All UI components are designed for mobile devices first (320px minimum width)
- Touch-friendly interactive elements (minimum 44x44px tap targets)
- Large, readable fonts (minimum 16px for body text)
- Simple, linear user flows optimized for one-handed use
- Progressive enhancement for larger screens

**Localization**
- **Language**: German (de-DE) for all UI text, forms, and PDF contracts
- **Currency**: Euro (€) for all pricing displays
- **Date Format**: German locale (DD.MM.YYYY or long format)
- **Number Format**: German formatting (1.000 kg, 1,2 m³)
- Vehicle data, form labels, error messages, and PDF content all in German

### Technology Decisions

**Next.js 16 App Router with Turbopack**
- Server Components by default for better performance
- Client Components only when needed (forms, signature capture, PDF generation)
- File-based routing in `app/` directory
- Turbopack bundler enabled by default for faster builds

**shadcn/ui Components**
- New York style variant
- Customizable, accessible components
- Mobile-responsive by default

**Signature Capture**
- Library: `react-signature-canvas`
- Touch-optimized for mobile devices
- Canvas-based for smooth drawing experience

**PDF Generation**
- Library: `jsPDF`
- Client-side generation for instant download
- Includes vehicle details, user info, and signature image

## Project Structure

```
app/
├── layout.tsx                      # Root layout with fonts and metadata
├── page.tsx                        # Homepage - vehicle listing
└── vehicles/
    └── [id]/
        └── page.tsx                # Dynamic vehicle detail page

components/
├── ui/                             # shadcn components (Button, Card, Input, etc.)
├── vehicle-card.tsx                # Vehicle listing card component
├── vehicle-details.tsx             # Vehicle information display
├── rental-form.tsx                 # User information form
└── signature-pad.tsx               # Signature capture component

lib/
├── utils.ts                        # Utility functions (cn, etc.)
├── vehicles.ts                     # Vehicle data and TypeScript types
└── pdf-generator.ts                # PDF generation logic

public/
└── vehicle-images/                 # Optimized vehicle images
    ├── excavator.jpg               # Caterpillar 320 (5.0MB, 5291x6614px)
    ├── bulldozer.jpg               # Komatsu D65 (1.6MB, 4160x6240px)
    └── wheel-loader.jpg            # Volvo L90H (1.3MB, 3030x2047px)
```

## Data Model

### Vehicle Type

```typescript
interface Vehicle {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: {
    weight?: string;
    capacity?: string;
    power?: string;
    dimensions?: string;
    [key: string]: string | undefined;
  };
  dailyRate: number;
  imageUrl?: string;
}
```

### Rental Contract Data

```typescript
interface RentalContract {
  vehicleId: string;
  vehicleName: string;
  firstName: string;
  lastName: string;
  signature: string; // Base64 data URL
  date: string; // ISO format
  dailyRate: number;
}
```

## Component Guidelines

### Mobile-First CSS

```typescript
// Example mobile-first responsive design
<div className="
  w-full p-4                    // Mobile: full width, padding
  md:max-w-2xl md:p-6          // Tablet: constrained width
  lg:max-w-4xl                 // Desktop: larger width
">
```

### Image Component Best Practices

```typescript
// Vehicle Card - Lazy loading for performance
// IMPORTANT: Card must have overflow-hidden p-0 border-0 to eliminate gaps
<Card className="w-full h-full flex flex-col overflow-hidden p-0 border-0">
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
</Card>

// Vehicle Details - Priority loading for above-the-fold content
// IMPORTANT: Card must have overflow-hidden p-0 border-0 to eliminate gaps
<Card className="overflow-hidden p-0 border-0">
  <div className="relative w-full h-64 md:h-96 rounded-t-lg overflow-hidden">
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
</Card>
```

**Card Component Styling Notes:**
- Add `overflow-hidden` to Card to prevent gaps between image and card edges
- Add `p-0` to remove default Card padding that creates space above image
- Add `border-0` to remove default Card border
- Use `rounded-t-lg` on image wrapper div to maintain rounded top corners
- This ensures images sit flush with the top of cards on both overview and detail pages

### Form Validation

- Use HTML5 validation attributes (required, pattern, etc.)
- Provide clear error messages
- Validate on submit, not on every keystroke
- Show validation state visually

### Signature Pad

- Minimum canvas size: 300x150px on mobile
- Clear button to reset signature
- Validation: ensure signature is not empty before allowing submission
- Export as PNG data URL for PDF inclusion

### PDF Generation

**Required Content:**
1. Header: Company name/logo
2. Document title: "MIETVERTRAG" (Rental Contract in German)
3. Date of rental (German format)
4. Vehicle information:
   - Name and category (in German)
   - Specifications (translated labels)
   - Daily rate (in EUR €)
5. Renter information:
   - First name (Vorname)
   - Last name (Nachname)
6. Signature image
7. Terms and conditions in German

**File Naming:**
- Format: `rental-{vehicleId}-{timestamp}.pdf`
- Example: `rental-excavator-001-20250123.pdf`

**Localization:**
- All text in German
- Date format: German locale (e.g., "23. Januar 2025")
- Currency: EUR (€)
- Section headings: FAHRZEUGINFORMATIONEN, MIETERINFORMATIONEN, ALLGEMEINE GESCHÄFTSBEDINGUNGEN, UNTERSCHRIFT

## Implementation Plan

### Phase 1: Foundation ✅ COMPLETED
- [x] Project setup with Next.js + TypeScript
- [x] shadcn/ui integration
- [x] Project documentation

### Phase 2: Data Layer ✅ COMPLETED
- [x] Create vehicle type definitions
- [x] Create 3 dummy vehicles with realistic data
- [x] Create rental contract type

### Phase 3: UI Components ✅ COMPLETED
- [x] Install required shadcn components (Card, Button, Input, Label)
- [x] Build vehicle card component
- [x] Build vehicle listing page (homepage)
- [x] Build vehicle detail page layout
- [x] Add vehicle images from Unsplash
- [x] Implement Next.js Image optimization

### Phase 4: Forms and Signature ✅ COMPLETED
- [x] Install signature library (react-signature-canvas)
- [x] Build rental form component
- [x] Build signature pad component
- [x] Form validation and error handling

### Phase 5: PDF Generation ✅ COMPLETED
- [x] Install jsPDF
- [x] Create PDF generator utility
- [x] Implement PDF download functionality
- [x] Test PDF output on mobile devices

### Phase 6: Image Optimization ✅ COMPLETED
- [x] Configure Next.js image optimization (AVIF/WebP)
- [x] Add lazy loading to card images
- [x] Enhanced alt text for accessibility
- [x] Add quality parameter and blur placeholders
- [x] Optimize responsive image sizing
- [x] Fix image alignment gaps on cards (overflow-hidden, p-0, border-0)

### Phase 7: Testing and Polish 🚧 IN PROGRESS
- [x] Test image alignment on overview and detail pages
- [ ] Test on mobile viewport (375x667, 414x896)
- [ ] Test signature capture on touch devices
- [ ] Test PDF generation and download
- [x] Add loading states
- [ ] Error handling

### Phase 8: Localization ✅ COMPLETED
- [x] Translate all UI text to German
- [x] Translate vehicle data (names, descriptions, specifications)
- [x] Translate form labels and placeholders
- [x] Translate error messages
- [x] Translate PDF contract content
- [x] Change currency from USD ($) to EUR (€)
- [x] Update date formatting to German locale
- [x] Update number formatting to German standards

### Phase 9: Next.js 16 Migration ✅ COMPLETED
- [x] Upgrade Next.js from 15.5.6 to 16.0.0
- [x] Upgrade eslint-config-next to 16.0.0
- [x] Remove --turbopack flags (now default)
- [x] Update next.config.ts with v16 image optimization settings
- [x] Configure image qualities to include 85
- [x] Test development server with Turbopack
- [x] Test production build
- [x] Update documentation

## Coding Standards

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` types
- Use type inference where possible

### React Components
- Use functional components with hooks
- Server Components by default
- Add `"use client"` directive only when necessary
- Keep components small and focused

### File Naming
- kebab-case for files: `vehicle-card.tsx`
- PascalCase for components: `VehicleCard`
- camelCase for functions and variables

### Imports
```typescript
// Order: React, Next.js, external, internal, types
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/lib/vehicles";
import type { RentalContract } from "@/lib/types";
```

## Testing Strategy

### Manual Testing Checklist

**Mobile Responsiveness:**
- [ ] Test on mobile viewport (375px width)
- [ ] Test on tablet viewport (768px width)
- [ ] Verify touch targets are at least 44x44px
- [ ] Verify text is readable without zooming

**User Flow:**
- [ ] Can view vehicle list
- [ ] Can navigate to vehicle detail page
- [ ] Can enter first and last name
- [ ] Can draw signature on canvas
- [ ] Can clear and redraw signature
- [ ] Can submit form
- [ ] PDF generates successfully
- [ ] PDF downloads to device
- [ ] PDF contains all required information
- [ ] Signature appears correctly in PDF

**Edge Cases:**
- [ ] Empty signature submission blocked
- [ ] Empty name fields blocked
- [ ] Very long names handled gracefully
- [ ] Complex signatures render correctly in PDF

## Deployment Notes

### Environment Variables
- None required for v1 (static data)

### Build Command
```bash
npm run build
```

### Performance Considerations
- **Images are optimized** using Next.js Image component
  - AVIF and WebP formats enabled for up to 50% size reduction
  - Lazy loading on card images (above-the-fold images use priority loading)
  - Blur placeholders for smooth UX
  - Quality set to 85 for optimal balance
  - Responsive sizing with proper `sizes` attributes
- **PDF generation is client-side** (no server load)
- **Static generation** possible for vehicle pages
- **Image optimization config** in next.config.ts:
  ```typescript
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
  ```

## Future Enhancements (Post-MVP)

1. **QR Code Generation**: Generate unique QR codes for each vehicle
2. **Backend Integration**: Store rental contracts in database
3. **Email Functionality**: Send PDF to user's email
4. **Authentication**: User accounts for rental history
5. **Payment Integration**: Process rental payments
6. **Admin Dashboard**: Manage vehicles and rentals
7. **Real-time Availability**: Check vehicle availability
8. **Multi-language Support**: Support multiple languages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

## Questions and Issues

For development questions or issues, refer to:
- README.md for project overview
- This file (CLAUDE.md) for implementation details
- Code comments for specific implementation notes
