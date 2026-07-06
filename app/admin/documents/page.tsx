import Link from "next/link";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSignedDocumentUrl } from "@/lib/storage";

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export default async function AdminDocumentsPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    redirect("/admin/login");
  }

  const documents = await db.document.findMany({
    include: {
      client: {
        select: {
          fullName: true,
          email: true,
          phone: true,
        },
      },
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

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>

          <p className="mt-2 text-gray-600">
            View and download documents uploaded by clients.
          </p>
        </div>

        <Link className="rounded-md border px-4 py-2" href="/admin/dashboard">
          Dashboard
        </Link>
      </header>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        {documentsWithUrls.length === 0 ? (
          <p className="text-gray-600">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {documentsWithUrls.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h2 className="font-semibold">{document.fileName}</h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Client: {document.client.fullName} ({document.client.email})
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Category: {document.category.replaceAll("_", " ")} · Size:{" "}
                    {formatFileSize(document.fileSize)} · Uploaded:{" "}
                    {document.uploadedAt.toLocaleDateString("en-IN")}
                  </p>
                </div>

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
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}