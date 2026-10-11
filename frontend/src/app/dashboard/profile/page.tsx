"use client";

import { useAppSelector } from "@/store/hooks";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-2" style={{ color: "#666" }}>Manage your account details.</p>
      <div className="mt-6 rounded-xl border bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium" style={{ color: "#666" }}>Name</label>
            <p className="text-lg">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium" style={{ color: "#666" }}>Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium" style={{ color: "#666" }}>Role</label>
            <p className="text-lg">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
