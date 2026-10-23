import { NextResponse } from "next/server";
import { extractPdfText } from "@/lib/ats/pdf";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No resume file was provided.",
        },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          error: `Only PDF files are supported. Received: ${file.type}`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          error: "The uploaded PDF is empty.",
        },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "The PDF must be smaller than 10 MB.",
        },
        { status: 400 }
      );
    }

    console.log("PDF received:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const text = await extractPdfText(file);

    if (!text) {
      return NextResponse.json(
        {
          error:
            "No readable text was found in the PDF. The resume may be image-based or scanned.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text,
      filename: file.name,
    });
 } catch (error) {
    console.error("PDF parsing error:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        error: "PDF parsing failed.",
        details: message,
      },
      { status: 500 }
    );
  }
}