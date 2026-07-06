/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/client/documents/page.tsx
 * Purpose : Client document upload and document list page.
 * ============================================================
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ClientDocument = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: string;
  uploadedAt: string;
  signedUrl: string;
};

const documentCategories = [
  "PAN",
  "AADHAAR",
  "FORM16",
  "ITR",
  "BANK_STATEMENT",
  "GST",
  "SALARY_SLIP",
  "PROPERTY",
  "OTHER",
];

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export default function ClientDocumentsPage() {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [category, setCategory] = useState("OTHER");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadDocuments() {
    const response = await fetch("/api/documents");
    const data = (await response.json()) as {
      documents?: ClientDocument[];
    };

    setDocuments(data.documents ?? []);
  }

  useEffect(() => {
    void loadDocuments();
  }, []);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a document.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await fetch("/api/documents", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(data.message ?? "Upload failed.");
      setLoading(false);
      return;
    }

    setMessage("Document uploaded successfully.");
    setFile(null);
    await loadDocuments();
    setLoading(false);
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="mt-2 text-gray-600">
            Upload and manage your tax documents securely.
          </p>
        </div>

        <Link className="rounded-md border px-4 py-2" href="/client/dashboard">
          Dashboard
        </Link>
      </header>

      <section className="mb-10 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Upload Document</h2>

        {message ? (
          <div className="mb-4 rounded-md border bg-gray-50 p-3 text-sm">
            {message}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleUpload}>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Document Category
            </label>

            <select
              className="w-full rounded-md border px-3 py-2"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {documentCategories.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Select File
            </label>

            <input
              className="w-full rounded-md border px-3 py-2"
              accept=".pdf,.jpg,.jpeg,.png,.xlsx"
              type="file"
              onChange={(event) =>
                setFile(event.target.files?.[0] ?? null)
              }
            />

            <p className="mt-2 text-sm text-gray-500">
              Allowed: PDF, JPG, PNG, XLSX. Maximum size: 10MB.
            </p>
          </div>

          <button
            className="rounded-md bg-slate-900 px-5 py-2 text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Uploaded Documents</h2>

        {documents.length === 0 ? (
          <p className="text-gray-600">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-3 rounded-md border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-semibold">{document.fileName}</h3>
                  <p className="text-sm text-gray-600">
                    {document.category.replaceAll("_", " ")} ·{" "}
                    {formatFileSize(document.fileSize)} ·{" "}
                    {new Date(document.uploadedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex gap-2">
                <div className="flex gap-2">
              <Link
               className="rounded-md border px-4 py-2 text-sm"
               href={document.signedUrl}
              target="_blank"
             >
             View
            </Link>

            <a
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
            href={document.signedUrl}
            download={document.fileName}
            >
            Download
            </a>
            </div>                                              
                <a
                className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
                href={document.signedUrl}
                download={document.fileName}
               >
                Download
               </a>
              </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}