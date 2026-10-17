"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getUserAuthorizedModules, Module } from "@/store/slices/moduleSlice";
import { useHydrated } from "@/store/Provider";
import {
  LayoutDashboard,
  Users,
  Palette,
  CalendarDays,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Shield,
  UserCircle,
  Image,
  Star,
  MessageSquare,
  BarChart3,
  Bookmark,
  MapPin,
  LucideIcon,
  Circle,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Palette,
  CalendarDays,
  Settings,
  Shield,
  UserCircle,
  Image,
  Star,
  MessageSquare,
  BarChart3,
  Bookmark,
  MapPin,
  Search,
};

function getIcon(iconName: string | null): LucideIcon {
  if (!iconName) return Circle;
  return iconMap[iconName] || Circle;
}

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const hydrated = useHydrated();
  const { user } = useAppSelector((state) => state.auth);
  const { modules } = useAppSelector((state) => state.modules);
  const userRole = hydrated ? (user?.role || "NormalUser") : "NormalUser";

  useEffect(() => {
    if (user) {
      dispatch(getUserAuthorizedModules());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const groupedByHeader = modules.reduce<Record<string, Module[]>>((acc, mod) => {
    const header = mod.header || "Other";
    if (!acc[header]) acc[header] = [];
    acc[header].push(mod);
    return acc;
  }, {});

  const sections = Object.entries(groupedByHeader)
    .map(([header, items]) => ({
      header,
      items: items.filter((item) => {
        if (!search.trim()) return true;
        const lower = search.toLowerCase();
        if (item.name.toLowerCase().includes(lower)) return true;
        if (item.children?.some((c) => c.name.toLowerCase().includes(lower))) return true;
        return false;
      }),
    }))
    .filter((section) => section.items.length > 0);

  const renderMenuItem = (item: Module) => {
    const Icon = getIcon(item.icon);
    const isActive = pathname === item.urlPath;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.textId];

    if (hasChildren) {
      return (
        <li key={item.textId}>
          <button
            onClick={() => {
              if (collapsed) setCollapsed(false);
              else toggleMenu(item.textId);
            }}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--accent)]/10 ${isOpen ? "text-[var(--accent)]" : ""}`}
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.name}</span>
                <ChevronDown size={16} className={`transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              </>
            )}
          </button>
          {!collapsed && isOpen && (
            <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
              {item.children.map((child) => (
                <li key={child.textId}>
                  <Link
                    href={child.urlPath || "#"}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--accent)]/10 ${pathname === child.urlPath ? "font-semibold text-[var(--accent)]" : ""}`}
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.textId}>
        <Link
          href={item.urlPath || "#"}
          className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--accent)]/10 ${isActive ? "bg-[var(--accent)]/10 font-semibold text-[var(--accent)]" : ""}`}
        >
          <Icon size={20} className="shrink-0" />
          {!collapsed && <span>{item.name}</span>}
          {collapsed && (
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.name}
            </div>
          )}
        </Link>
      </li>
    );
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b px-4 py-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white font-bold text-lg">
              TN
            </div>
            <div>
              <span className="text-lg font-bold">TattooNest</span>
              <span className="block text-xs capitalize" style={{ color: "#999" }}>{userRole}</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white font-bold text-lg">
            TW
          </div>
        )}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 transition-colors hover:bg-gray-100 lg:flex"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {sections.map((section) => (
            <div key={section.header}>
              {!collapsed && (
                <h3 className="mb-2 mt-4 px-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#999" }}>
                  {section.header}
                </h3>
              )}
              {section.items.map(renderMenuItem)}
            </div>
          ))}
        </ul>
      </div>

      <div className="border-t px-3 py-3">
        {collapsed ? (
          <div className="flex justify-center">
            <Search size={18} style={{ color: "#999" }} />
          </div>
        ) : (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#999" }} />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm outline-none transition-colors focus:border-[var(--accent)]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                style={{ color: "#999" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-40 rounded-lg bg-white p-2 shadow-md lg:hidden"
        >
          <LayoutDashboard size={20} />
        </button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <nav className="relative z-10 h-full w-64 shadow-xl">{sidebarContent}</nav>
          </div>
        )}
      </>
    );
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 top-0 z-40 hidden transition-all duration-300 lg:block ${collapsed ? "w-[72px]" : "w-[260px]"} shadow-[2px_0_8px_rgba(0,0,0,0.06)]`}
    >
      {sidebarContent}
    </nav>
  );
}
