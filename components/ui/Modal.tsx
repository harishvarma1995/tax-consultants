/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Modal.tsx
 * Purpose : Reusable accessible modal component.
 * ============================================================
 */

"use client";

import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 px-4"
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-lg bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold" id="modal-title">
            {title}
          </h2>

          <button
            aria-label="Close modal"
            className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}