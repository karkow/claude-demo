"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignaturePad, type SignaturePadRef } from "@/components/signature-pad";
import { FileDown, Loader2 } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";

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

    if (signaturePadRef.current?.isEmpty()) {
      newErrors.signature = "Unterschrift ist erforderlich";
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
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
