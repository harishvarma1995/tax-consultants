/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/storage.ts
 * Purpose : Centralized Supabase Storage helpers.
 * ============================================================
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = "client-documents";

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase storage environment variables are missing.");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
);

export const allowedDocumentMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const maxDocumentSizeBytes = 10 * 1024 * 1024;

export function sanitizeFileName(fileName: string) {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

export function validateDocumentFile(file: File) {
  if (file.size > maxDocumentSizeBytes) {
    return "File size must be 10MB or less.";
  }

  if (!allowedDocumentMimeTypes.includes(file.type)) {
    return "Only PDF, JPG, PNG, and XLSX files are allowed.";
  }

  return null;
}

export function buildDocumentStoragePath(
  clientId: string,
  fileName: string
) {
  const safeFileName = sanitizeFileName(fileName);
  return `documents/${clientId}/${Date.now()}_${safeFileName}`;
}

export async function uploadDocumentFile(
  clientId: string,
  file: File
) {
  const validationError = validateDocumentFile(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const storagePath = buildDocumentStoragePath(clientId, file.name);

  const { error } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return storagePath;
}

export async function getSignedDocumentUrl(storagePath: string) {
  const { data, error } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrl(storagePath, 60 * 60);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message ?? "Unable to create signed URL.");
  }

  return data.signedUrl;
}

export async function deleteDocumentFile(storagePath: string) {
  const { error } = await supabaseAdmin.storage
    .from(bucketName)
    .remove([storagePath]);

  if (error) {
    throw new Error(error.message);
  }
}