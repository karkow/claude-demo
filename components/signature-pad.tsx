"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface SignaturePadRef {
  isEmpty: () => boolean;
  clear: () => void;
  toDataURL: () => string;
}

interface SignaturePadProps {
  onSignatureChange?: (isEmpty: boolean) => void;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ onSignatureChange }, ref) => {
    const sigCanvas = useRef<SignatureCanvas>(null);

    useImperativeHandle(ref, () => ({
      isEmpty: () => {
        return sigCanvas.current?.isEmpty() ?? true;
      },
      clear: () => {
        sigCanvas.current?.clear();
        onSignatureChange?.(true);
      },
      toDataURL: () => {
        return sigCanvas.current?.toDataURL("image/png") ?? "";
      },
    }));

    const handleClear = () => {
      sigCanvas.current?.clear();
      onSignatureChange?.(true);
    };

    const handleEnd = () => {
      const isEmpty = sigCanvas.current?.isEmpty() ?? true;
      onSignatureChange?.(!isEmpty);
    };

    return (
      <div className="w-full">
        <div className="relative border-2 border-dashed rounded-lg bg-muted/30 touch-none">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: "w-full h-40 md:h-48 rounded-lg cursor-crosshair",
            }}
            backgroundColor="transparent"
            onEnd={handleEnd}
          />
          <div className="absolute top-2 left-2 text-xs text-muted-foreground pointer-events-none">
            Sign here
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="mt-2 w-full md:w-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Signature
        </Button>
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";
