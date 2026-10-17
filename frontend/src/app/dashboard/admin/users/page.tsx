"use client";

import { useEffect, useState } from "react";
import { Search, Shield, Trash2, X, Lock, Plus } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAppSelector } from "@/store/hooks";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

const ALL_ROLES = ["SuperAdmin", "Admin", "Artist", "NormalUser"];

interface UserRow {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AllUsersPage() {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const isSuperAdmin = currentUser?.role === "SuperAdmin";
  const assignableRoles = isSuperAdmin ? ALL_ROLES : ALL_ROLES.filter((r) => r !== "SuperAdmin");

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editingRole, setEditingRole] = useState<{ id: string; role: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", role: "NormalUser" });
  const [createError, setCreateError] = useState("");

  const canEditUser = (u: UserRow) => {
    if (u.id === currentUser?.userId) return false;
    if (u.role === "SuperAdmin" && !isSuperAdmin) return false;
    return true;
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(urlHelper.role.users);
      setUsers(res.data);
    } catch { /* empty */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await api.put(urlHelper.role.updateRole(userId), { role: newRole });
      setEditingRole(null);
      load();
    } catch { /* empty */ }
  };

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`${urlHelper.role.users.replace("/users", "")}/users/${userId}`);
      setDeleteConfirm(null);
      load();
    } catch { /* empty */ }
  };

  const handleCreate = async () => {
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) return;
    setCreating(true);
    setCreateError("");
    try {
      await api.post(urlHelper.auth.register, {
        name: createForm.name,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
      });
      setCreateOpen(false);
      setCreateForm({ name: "", email: "", password: "", role: "NormalUser" });
      load();
    } catch (err: any) {
      setCreateError(err.response?.data?.error || err.response?.data?.message || "Failed to create user.");
    } finally {
      setCreating(false);
    }
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== "All" && u.role !== roleFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      SuperAdmin: "bg-red-50 text-red-700",
      Admin: "bg-purple-50 text-purple-700",
      Artist: "bg-green-50 text-green-700",
      NormalUser: "bg-gray-100 text-gray-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>
            {users.length} registered user{users.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Button onClick={() => { setCreateOpen(true); setCreateError(""); }} size="md">
          <Plus size={18} /> Add User
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {["All", ...ALL_ROLES].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                roleFilter === r ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-gray-200 hover:border-[var(--accent)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <Search size={16} style={{ color: "#999" }} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>User</th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:table-cell" style={{ color: "#999" }}>Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Role</th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider md:table-cell" style={{ color: "#999" }}>Joined</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Actions</th>
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
                  <td className="hidden px-5 py-4 text-sm sm:table-cell" style={{ color: "#666" }}>{user.email}</td>
                  <td className="px-5 py-4">
                    {editingRole?.id === user.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={editingRole.role}
                          onChange={(e) => setEditingRole({ ...editingRole, role: e.target.value })}
                          className="rounded-lg border border-gray-200 px-2 py-1 text-xs outline-none focus:border-[var(--accent)]"
                        >
                          {assignableRoles.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <button onClick={() => handleRoleChange(user.id, editingRole.role)} className="rounded bg-[var(--accent)] px-2 py-1 text-xs font-medium text-white">Save</button>
                        <button onClick={() => setEditingRole(null)} className="text-xs" style={{ color: "#999" }}>Cancel</button>
                      </div>
                    ) : canEditUser(user) ? (
                      <button
                        onClick={() => setEditingRole({ id: user.id, role: user.role })}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors hover:ring-1 hover:ring-[var(--accent)] ${roleBadge(user.role)}`}
                      >
                        <Shield size={11} />
                        {user.role}
                      </button>
                    ) : (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge(user.role)}`} title={user.id === currentUser?.userId ? "You cannot change your own role" : "Only SuperAdmins can modify this role"}>
                        <Lock size={11} />
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-5 py-4 text-sm md:table-cell" style={{ color: "#999" }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {canEditUser(user) ? (
                      <button onClick={() => setDeleteConfirm(user.id)} className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <span className="inline-block p-1.5 text-gray-200">
                        <Trash2 size={16} />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create User Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-24">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold">Add New User</h2>
              <button onClick={() => setCreateOpen(false)} className="rounded-lg p-1 hover:bg-gray-100"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {createError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{createError}</div>
              )}
              <Input label="Full Name" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} required />
              <Input label="Email" type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} required />
              <Input label="Password" type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} required />
              <div>
                <p className="mb-2 text-sm font-medium">Role</p>
                <div className="flex flex-wrap gap-2">
                  {assignableRoles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setCreateForm({ ...createForm, role: r })}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        createForm.role === r ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-gray-200 hover:border-[var(--accent)]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={creating || !createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()}>
                {creating ? "Creating..." : "Create User"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold">Delete User</h3>
            <p className="mt-2 text-sm" style={{ color: "#666" }}>This will permanently delete this user account.</p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <button onClick={() => handleDelete(deleteConfirm)} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
