"use client";

import { useRef, forwardRef, useImperativeHandle, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface SignaturePadRef {
  isEmpty: () => boolean;
  isValid: () => boolean;
  clear: () => void;
  toDataURL: () => string;
}

interface SignaturePadProps {
  onSignatureChange?: (isEmpty: boolean) => void;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ onSignatureChange }, ref) => {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [signatureData, setSignatureData] = useState<any[]>([]);

    // Preserve signature data on viewport changes (mobile keyboard, resize, orientation)
    useEffect(() => {
      let resizeTimeout: NodeJS.Timeout;

      const restoreSignature = () => {
        const canvas = sigCanvas.current;
        if (canvas && signatureData.length > 0) {
          // Wait for canvas to be fully ready after resize
          setTimeout(() => {
            if (canvas) {
              canvas.fromData(signatureData);
            }
          }, 150);
        }
      };

      const handleResize = () => {
        const canvas = sigCanvas.current;
        if (canvas && !canvas.isEmpty()) {
          // Save current signature data before any potential clear
          const data = canvas.toData();
          setSignatureData(data);
        }

        // Debounce restoration to avoid multiple rapid resizes
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          restoreSignature();
        }, 200);
      };

      // Handle mobile keyboard specifically with visualViewport API
      const handleVisualViewportResize = () => {
        const canvas = sigCanvas.current;
        if (canvas && !canvas.isEmpty()) {
          const data = canvas.toData();
          setSignatureData(data);
        }

        requestAnimationFrame(() => {
          restoreSignature();
        });
      };

      // Handle orientation changes (mobile)
      const handleOrientationChange = () => {
        const canvas = sigCanvas.current;
        if (canvas && !canvas.isEmpty()) {
          const data = canvas.toData();
          setSignatureData(data);
        }

        // Wait for orientation change to complete
        setTimeout(() => {
          restoreSignature();
        }, 300);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);

      // Use visualViewport API if available (better for mobile)
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleVisualViewportResize);
      }

      // Watch canvas element directly for size changes
      let resizeObserver: ResizeObserver | null = null;
      const canvas = sigCanvas.current;
      if (canvas) {
        const canvasElement = canvas.getCanvas();
        if (canvasElement) {
          resizeObserver = new ResizeObserver(() => {
            // Canvas was resized, restore signature if we have data
            if (signatureData.length > 0) {
              setTimeout(() => {
                restoreSignature();
              }, 100);
            }
          });
          resizeObserver.observe(canvasElement);
        }
      }

      return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [signatureData]);

    useImperativeHandle(ref, () => ({
      isEmpty: () => {
        return sigCanvas.current?.isEmpty() ?? true;
      },
      isValid: () => {
        const canvas = sigCanvas.current;
        if (!canvas || canvas.isEmpty()) {
          return false;
        }

        // Get signature data points
        const data = canvas.toData();

        // Check if there are multiple stroke points (not just a single dot)
        let totalPoints = 0;
        for (const stroke of data) {
          totalPoints += stroke.length;
        }

        // Require at least 10 points for a valid signature
        if (totalPoints < 10) {
          return false;
        }

        // Check signature dimensions (bounding box)
        const canvasElement = canvas.getCanvas();
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return false;

        const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const pixels = imageData.data;

        let minX = canvasElement.width;
        let maxX = 0;
        let minY = canvasElement.height;
        let maxY = 0;

        // Find bounding box of signature
        for (let y = 0; y < canvasElement.height; y++) {
          for (let x = 0; x < canvasElement.width; x++) {
            const index = (y * canvasElement.width + x) * 4;
            const alpha = pixels[index + 3];

            if (alpha > 0) {
              minX = Math.min(minX, x);
              maxX = Math.max(maxX, x);
              minY = Math.min(minY, y);
              maxY = Math.max(maxY, y);
            }
          }
        }

        const width = maxX - minX;
        const height = maxY - minY;

        // Require minimum dimensions (at least 40px wide and 15px tall)
        return width >= 40 && height >= 15;
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
      setSignatureData([]);
      onSignatureChange?.(true);
    };

    const handleEnd = () => {
      const canvas = sigCanvas.current;
      if (canvas && !canvas.isEmpty()) {
        // Save signature data after each stroke
        const data = canvas.toData();
        setSignatureData(data);
      }
      const isEmpty = canvas?.isEmpty() ?? true;
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
            Hier unterschreiben
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
          Unterschrift löschen
        </Button>
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";
