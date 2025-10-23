# Construction Vehicle Rental Platform

A mobile-first Next.js application for renting construction vehicles with digital signature capture and PDF contract generation. **Fully localized in German with Euro currency.**

## Project Overview

This platform enables construction vehicle rentals through QR codes attached to vehicles. Users scan the QR code, view vehicle details, fill in their information, sign digitally, and receive a rental contract PDF instantly.

### Key Features

- **German Localization**: All UI text, forms, and PDF contracts in German
- **Euro Currency**: Prices displayed in EUR (€)
- **Mobile-First Design**: Optimized for smartphone use in the field
- **High-Quality Vehicle Images**: Professional photos with optimized AVIF/WebP formats
- **QR Code Integration**: Each vehicle has a unique QR code linking to its detail page
- **Digital Signature**: Touch-based signature capture
- **PDF Generation**: Automatic rental contract generation with vehicle details, user information, and signature
- **Instant Download**: PDF downloads directly to user's device
- **Image Optimization**: Next.js Image component with lazy loading and blur placeholders

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Signature Capture**: react-signature-canvas
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
claude-demo/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage (vehicle listing)
│   └── vehicles/
│       └── [id]/
│           └── page.tsx           # Vehicle detail page
├── components/
│   ├── ui/                        # shadcn components
│   ├── vehicle-card.tsx           # Vehicle listing card
│   ├── vehicle-details.tsx        # Vehicle information display
│   ├── rental-form.tsx            # User information form
│   └── signature-pad.tsx          # Signature capture component
├── lib/
│   ├── utils.ts                   # Utility functions
│   ├── vehicles.ts                # Vehicle data and types
│   └── pdf-generator.ts           # PDF generation logic
└── public/
    └── vehicle-images/            # Optimized vehicle images (JPEG)
        ├── excavator.jpg          # 5.0MB - Caterpillar 320
        ├── bulldozer.jpg          # 1.6MB - Komatsu D65
        └── wheel-loader.jpg       # 1.3MB - Volvo L90H
```

## User Flow

1. **Scan QR Code**: User scans QR code on construction vehicle
2. **View Details**: Redirected to vehicle detail page showing specifications (in German)
3. **Enter Information**: Fill in first name (Vorname), last name (Nachname)
4. **Sign Contract**: Draw signature on touch-enabled signature pad
5. **Generate PDF**: Confirm and generate rental contract PDF (in German with € pricing)
6. **Download**: PDF automatically downloads to device

## Localization

- **Language**: German (de-DE)
- **Currency**: Euro (€)
- **Date Format**: German locale (DD.MM.YYYY)
- **Number Format**: German formatting (1.000 instead of 1,000)
- **All text translated**: UI, forms, error messages, PDF contracts

## Development Guidelines

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines and best practices.

## Image Optimization

The project uses Next.js Image component with:
- **AVIF and WebP formats** for optimal compression (up to 50% smaller)
- **Lazy loading** on vehicle cards for faster initial page load
- **Blur placeholders** for smooth loading experience
- **Quality set to 85** for optimal quality/size balance
- **Responsive sizing** based on viewport and device pixel ratio

Images are automatically optimized at build time and served in the most efficient format supported by the user's browser.

## Available MCP Servers

- **playwright**: Browser automation and testing
- **shadcn**: Component management
- **context7**: Documentation and library reference

## License

This project is private and proprietary.
