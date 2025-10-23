"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignaturePad, type SignaturePadRef } from "@/components/signature-pad";
import { FileDown, Loader2, CheckCircle2, Home, FileText } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import Link from "next/link";

interface RentalFormProps {
  vehicle: Vehicle;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    signature: string;
  }) => Promise<void>;
}

export function RentalForm({ vehicle, onSubmit }: RentalFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    signature?: string;
  }>({});

  const signaturePadRef = useRef<SignaturePadRef>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Vorname ist erforderlich";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Nachname ist erforderlich";
    }

    // Check if signature exists and is valid (not just a dot)
    if (signaturePadRef.current?.isEmpty()) {
      newErrors.signature = "Unterschrift ist erforderlich";
    } else if (!signaturePadRef.current?.isValid()) {
      newErrors.signature = "Bitte zeichnen Sie eine vollständige Unterschrift (nicht nur einen Punkt)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const signature = signaturePadRef.current?.toDataURL() ?? "";
      await onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        signature,
      });

      // Show success message
      setIsSuccess(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRental = () => {
    setIsSuccess(false);
    setFirstName("");
    setLastName("");
    setErrors({});
    signaturePadRef.current?.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show success message after PDF generation
  if (isSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300 text-lg font-semibold">
            Mietvertrag erfolgreich erstellt!
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400 mt-2 space-y-2">
            <p>
              Ihr Mietvertrag wurde erfolgreich erstellt und heruntergeladen.
              Sie finden die PDF-Datei in Ihren Downloads.
            </p>
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
              <p className="text-sm font-medium mb-3">Vertragsinformationen:</p>
              <ul className="text-sm space-y-1">
                <li>• Fahrzeug: {vehicle.name}</li>
                <li>• Mieter: {firstName} {lastName}</li>
                <li>• Tagesrate: €{vehicle.dailyRate}</li>
                <li>• Datum: {new Date().toLocaleDateString('de-DE')}</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleNewRental}
            variant="default"
            className="flex-1 h-12 text-base"
            size="lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Neue Miete erstellen
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 h-12 text-base"
            size="lg"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Zurück zur Übersicht
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ihre Angaben</h3>

        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-base">
            Vorname <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) {
                setErrors({ ...errors, firstName: undefined });
              }
            }}
            placeholder="Geben Sie Ihren Vornamen ein"
            className="h-12 text-base"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-sm text-destructive">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-base">
            Nachname <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) {
                setErrors({ ...errors, lastName: undefined });
              }
            }}
            placeholder="Geben Sie Ihren Nachnamen ein"
            className="h-12 text-base"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-sm text-destructive">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Signature Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Digitale Unterschrift <span className="text-destructive">*</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Bitte unterschreiben Sie unten, um Ihren Mietvertrag zu bestätigen
          </p>
        </div>

        <SignaturePad
          ref={signaturePadRef}
          onSignatureChange={(isEmpty) => {
            if (!isEmpty && errors.signature) {
              setErrors({ ...errors, signature: undefined });
            }
          }}
        />

        {errors.signature && (
          <p className="text-sm text-destructive">{errors.signature}</p>
        )}
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4 pt-4 border-t">
        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="font-medium mb-2">Zusammenfassung des Mietvertrags:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>Fahrzeug: {vehicle.name}</li>
            <li>Tagesrate: €{vehicle.dailyRate}</li>
            <li>Datum: {new Date().toLocaleDateString('de-DE')}</li>
          </ul>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Vertrag wird erstellt...
            </>
          ) : (
            <>
              <FileDown className="mr-2 h-5 w-5" />
              Vertrag erstellen & herunterladen
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
