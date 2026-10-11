"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: Record<string, unknown>) => void;
}

interface DataGridProps {
  columns: Column[];
  data: Record<string, unknown>[];
  actions?: Action[];
  rowsPerPage?: number;
  heading?: string;
  loading?: boolean;
  onRefresh?: () => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAdd?: () => void;
}

export default function DataGrid({
  columns,
  data,
  actions = [],
  rowsPerPage = 10,
  heading = "",
  loading = false,
  onRefresh,
  showAddButton = false,
  addButtonLabel = "Add New",
  onAdd,
}: DataGridProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionRow, setOpenActionRow] = useState<number | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const handleClick = () => setOpenActionRow(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const lower = search.toLowerCase();
    return columns.some((col) => {
      const val = col.render ? col.render(row) : row[col.key];
      return String(val ?? "").toLowerCase().includes(lower);
    });
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* Header bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {heading && <h2 className="text-xl font-bold">{heading}</h2>}
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-sm" style={{ color: "#666" }}>
            {filteredData.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#999" }} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[var(--accent)]"
            />
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-50"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          )}
          {showAddButton && (
            <button
              onClick={onAdd}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              {addButtonLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 size={32} className="animate-spin text-[var(--accent)]" />
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {actions.length > 0 && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#666" }}>
                      Actions
                    </th>
                  )}
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#666" }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-gray-50">
                      {actions.length > 0 && (
                        <td className="px-4 py-3">
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionRow(openActionRow === idx ? null : idx);
                              }}
                              className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
                            >
                              <MoreHorizontal size={18} />
                            </button>
                            {openActionRow === idx && (
                              <div className="absolute left-0 top-full z-20 mt-1 min-w-[160px] rounded-xl border bg-white py-1 shadow-lg">
                                {actions.map((action, aIdx) => (
                                  <button
                                    key={aIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick(row);
                                      setOpenActionRow(null);
                                    }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50"
                                  >
                                    {action.icon}
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="whitespace-nowrap px-4 py-3 text-sm" style={{ color: "#444" }}>
                          {col.render ? col.render(row) : String(row[col.key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                      className="px-4 py-12 text-center text-sm"
                      style={{ color: "#999" }}
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm" style={{ color: "#999" }}>
            Showing {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => (
                <span key={page} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== page - 1 && (
                    <span className="px-1 text-sm" style={{ color: "#999" }}>...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[var(--accent)] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
