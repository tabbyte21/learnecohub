"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Navigation,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Sayfalar", href: "/admin/pages", icon: FileText },
  { label: "Menü Yönetimi", href: "/admin/menu", icon: Navigation },
  { label: "Ayarlar", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ active }: { active: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#1A1A2E] text-white z-40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <a href="/admin" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="LearnecoHub"
              className="h-7 w-auto"
            />
            <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
              Admin
            </span>
          </a>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.label === active;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.82rem] font-semibold transition-all ${
                isActive
                  ? "bg-brand-600/20 text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                className={`w-4.5 h-4.5 flex-shrink-0 ${
                  isActive ? "text-[#F5C518]" : ""
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Bottom: Back to site */}
      <div className="absolute bottom-4 left-0 right-0 px-2">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.82rem] font-semibold text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          title={collapsed ? "Siteye Git" : undefined}
        >
          <Menu className="w-4.5 h-4.5 flex-shrink-0" />
          {!collapsed && <span>Siteye Git</span>}
        </a>
      </div>
    </aside>
  );
}
