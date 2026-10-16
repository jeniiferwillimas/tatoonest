"use client";

import { useEffect, useState } from "react";
import { Shield, Users, Lock, CheckCircle } from "lucide-react";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface RoleData {
  name: string;
  userCount: number;
}

const ROLE_PERMISSIONS: Record<string, string[]> = {
  Admin: ["Manage users", "Manage artists", "View analytics", "Manage roles", "Site settings", "All dashboard access"],
  Artist: ["Manage portfolio", "View bookings", "Reply to messages", "View reviews", "Edit profile"],
  NormalUser: ["Browse artists", "Create bookings", "Send messages", "Write reviews", "Save favorites"],
};

const ROLE_COLORS: Record<string, string> = {
  Admin: "#9333ea",
  Artist: "#16a34a",
  NormalUser: "#2563eb",
};

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(urlHelper.role.roles);
        setRoles(res.data);
      } catch {
        setRoles([
          { name: "Admin", userCount: 1 },
          { name: "Artist", userCount: 0 },
          { name: "NormalUser", userCount: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Role Management</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Manage user roles and their permissions.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div key={role.name} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                  style={{ background: ROLE_COLORS[role.name] || "#666" }}
                >
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{role.name}</h3>
                  <p className="flex items-center gap-1 text-xs" style={{ color: "#999" }}>
                    <Users size={12} /> {role.userCount} user{role.userCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
                  <Lock size={12} /> Permissions
                </p>
                <ul className="space-y-1.5">
                  {(ROLE_PERMISSIONS[role.name] || []).map((perm) => (
                    <li key={perm} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="shrink-0 text-[var(--accent)]" />
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
