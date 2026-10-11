"use client";

import { useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2" style={{ color: "#666" }}>
        Welcome back, {user?.name || "User"}
      </p>
    </div>
  );
}
