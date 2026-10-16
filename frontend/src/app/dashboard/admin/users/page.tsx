"use client";

import { useEffect, useState } from "react";
import { Search, Shield, MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface UserRow {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(urlHelper.role.users);
        setUsers(res.data);
      } catch {
        // not authorized or error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Users</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>
            {users.length} registered user{users.length !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
        <Search size={16} style={{ color: "#999" }} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                        {user.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#666" }}>{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "Admin" ? "bg-purple-50 text-purple-700" :
                      user.role === "Artist" ? "bg-green-50 text-green-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      <Shield size={11} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#999" }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
