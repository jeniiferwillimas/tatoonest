"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import {
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case "SuperAdmin":
        return "bg-red-100 text-red-700";
      case "Artist":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 transition-colors hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                {getInitials()}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold">{user?.name || "User"}</p>
                <p className="text-xs" style={{ color: "#999" }}>{user?.email}</p>
              </div>
              <ChevronDown size={16} className="hidden md:block" style={{ color: "#999" }} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border bg-white shadow-lg">
                <div className="border-b p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-white">
                      {getInitials()}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="truncate text-xs" style={{ color: "#999" }}>{user?.email}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getRoleBadgeColor()}`}>
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
