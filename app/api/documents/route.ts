/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/documents/route.ts
 * Purpose : Upload and list client documents.
 * ============================================================
 */

import { NextResponse } from "next/server";
import { DocumentCategory, UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSignedDocumentUrl, uploadDocumentFile } from "@/lib/storage";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const documents = await db.document.findMany({
    where: {
      clientId: session.user.id,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  const documentsWithUrls = await Promise.all(
  documents.map(async (document) => ({
    ...document,
    signedUrl: await getSignedDocumentUrl(document.storagePath),
  }))
);

return NextResponse.json({
  documents: documentsWithUrls,
});
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const formData = await request.formData();

  const file = formData.get("file");

  const category = String(
    formData.get("category") ?? "OTHER"
  ) as DocumentCategory;

  const taxYearId = String(
    formData.get("taxYearId") ?? ""
  );

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Document is required." },
      { status: 400 }
    );
  }

  const storagePath = await uploadDocumentFile(
    session.user.id,
    file
  );

  const document = await db.document.create({
    data: {
      clientId: session.user.id,
      taxYearId: taxYearId || null,
      fileName: file.name,
      storagePath,
      fileType: file.type,
      fileSize: file.size,
      category,
    },
  });

  return NextResponse.json(
    {
      message: "Document uploaded successfully.",
      document,
    },
    {
      status: 201,
    }
  );
}