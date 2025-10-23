import { jsPDF } from "jspdf";

interface GeneratePDFOptions {
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  vehicleSpecifications: Record<string, string | undefined>;
  firstName: string;
  lastName: string;
  signature: string;
  date: string;
  dailyRate: number;
}

export async function generatePDF(options: GeneratePDFOptions): Promise<void> {
  const {
    vehicleId,
    vehicleName,
    vehicleCategory,
    vehicleSpecifications,
    firstName,
    lastName,
    signature,
    date,
    dailyRate,
  } = options;

  // Create new PDF document (A4 size)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with line spacing
  const addText = (
    text: string,
    x: number,
    y: number,
    options?: {
      fontSize?: number;
      fontStyle?: "normal" | "bold" | "italic";
      align?: "left" | "center" | "right";
    }
  ) => {
    doc.setFontSize(options?.fontSize || 11);
    doc.setFont("helvetica", options?.fontStyle || "normal");
    doc.text(text, x, y, { align: options?.align || "left" });
  };

  // Header
  doc.setFillColor(30, 30, 30);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  addText("CONSTRUCTRENT", margin, 20, {
    fontSize: 24,
    fontStyle: "bold",
  });
  addText("Construction Vehicle Rental Agreement", margin, 30, {
    fontSize: 12,
  });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  yPosition = 50;

  // Document title
  addText("RENTAL CONTRACT", pageWidth / 2, yPosition, {
    fontSize: 16,
    fontStyle: "bold",
    align: "center",
  });
  yPosition += 15;

  // Date and Contract ID
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  addText(`Date: ${formattedDate}`, margin, yPosition);
  yPosition += 7;
  addText(`Contract ID: ${vehicleId}-${Date.now()}`, margin, yPosition);
  yPosition += 15;

  // Vehicle Information Section
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText("VEHICLE INFORMATION", margin, yPosition, {
    fontSize: 14,
    fontStyle: "bold",
  });
  yPosition += 8;

  addText(`Vehicle: ${vehicleName}`, margin, yPosition, { fontStyle: "bold" });
  yPosition += 7;
  addText(`Category: ${vehicleCategory}`, margin, yPosition);
  yPosition += 7;
  addText(`Daily Rental Rate: $${dailyRate.toFixed(2)}`, margin, yPosition);
  yPosition += 10;

  // Specifications
  addText("Specifications:", margin, yPosition, { fontStyle: "bold" });
  yPosition += 7;

  const specs = Object.entries(vehicleSpecifications).filter(
    ([, value]) => value
  );

  for (const [key, value] of specs) {
    const label = key.replace(/([A-Z])/g, " $1").trim();
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
    addText(`  • ${capitalizedLabel}: ${value}`, margin, yPosition);
    yPosition += 6;
  }

  yPosition += 10;

  // Renter Information Section
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText("RENTER INFORMATION", margin, yPosition, {
    fontSize: 14,
    fontStyle: "bold",
  });
  yPosition += 8;

  addText(`Name: ${firstName} ${lastName}`, margin, yPosition, {
    fontStyle: "bold",
  });
  yPosition += 7;
  addText(`Date of Rental: ${formattedDate}`, margin, yPosition);
  yPosition += 15;

  // Terms and Conditions Section
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText("TERMS AND CONDITIONS", margin, yPosition, {
    fontSize: 14,
    fontStyle: "bold",
  });
  yPosition += 8;

  const terms = [
    "The renter agrees to use the vehicle only for its intended purpose.",
    "The renter is responsible for any damage to the vehicle during the rental period.",
    "Payment is due upon completion of the rental period.",
    "The vehicle must be returned in the same condition as received.",
    "The renter must have appropriate licenses and certifications to operate the vehicle.",
  ];

  doc.setFontSize(10);
  for (const term of terms) {
    const lines = doc.splitTextToSize(`• ${term}`, contentWidth - 5);
    for (const line of lines) {
      if (yPosition > doc.internal.pageSize.getHeight() - 70) {
        doc.addPage();
        yPosition = margin;
      }
      addText(line, margin, yPosition, { fontSize: 10 });
      yPosition += 5;
    }
  }

  yPosition += 10;

  // Signature Section
  if (yPosition > doc.internal.pageSize.getHeight() - 80) {
    doc.addPage();
    yPosition = margin;
  }

  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText("SIGNATURE", margin, yPosition, {
    fontSize: 14,
    fontStyle: "bold",
  });
  yPosition += 10;

  addText("Renter Signature:", margin, yPosition);
  yPosition += 5;

  // Add signature image
  try {
    const signatureWidth = 70;
    const signatureHeight = 30;
    doc.addImage(
      signature,
      "PNG",
      margin,
      yPosition,
      signatureWidth,
      signatureHeight
    );
    yPosition += signatureHeight + 5;
  } catch (error) {
    console.error("Error adding signature to PDF:", error);
    addText("[Signature could not be embedded]", margin, yPosition);
    yPosition += 10;
  }

  doc.line(margin, yPosition, margin + 70, yPosition);
  yPosition += 5;
  addText(`${firstName} ${lastName}`, margin, yPosition, { fontSize: 10 });
  yPosition += 5;
  addText(formattedDate, margin, yPosition, { fontSize: 10 });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  addText(
    "This is a digitally generated rental agreement. For questions, please contact ConstructRent support.",
    pageWidth / 2,
    footerY,
    { fontSize: 9, align: "center" }
  );

  // Generate filename
  const timestamp = new Date().getTime();
  const filename = `rental-${vehicleId}-${timestamp}.pdf`;

  // Save the PDF
  doc.save(filename);
}
