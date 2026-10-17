"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (!stored) router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="transition-all duration-300 lg:ml-[260px]">
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" /></div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}
