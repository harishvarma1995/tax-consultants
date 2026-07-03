/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Table.tsx
 * Purpose : Reusable table component with empty state support.
 * ============================================================
 */

import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";

type TableColumn<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  emptyTitle: string;
  emptyDescription: string;
};

export function Table<T extends Record<string, ReactNode>>({
  columns,
  rows,
  emptyTitle,
  emptyDescription,
}: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full border-collapse bg-card text-sm">
        <thead className="bg-muted text-left">
          <tr>
            {columns.map((column) => (
              <th className="px-4 py-3 font-semibold" key={String(column.key)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className="border-t border-border" key={rowIndex}>
              {columns.map((column) => (
                <td className="px-4 py-3" key={String(column.key)}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}