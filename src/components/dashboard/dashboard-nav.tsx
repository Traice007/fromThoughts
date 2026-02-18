"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Plug,
  Upload,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Forecasts", href: "/dashboard/forecasts", icon: TrendingUp },
  { name: "OKRs", href: "/dashboard/okrs", icon: Target },
  { name: "Pipeline", href: "/dashboard/pipeline", icon: Upload },
  { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Subset of nav items for the mobile bottom tab bar
const mobileNavItems = [
  navigation[0], // Overview
  navigation[1], // Forecasts
  navigation[2], // OKRs
  navigation[3], // Pipeline
  navigation[6], // Settings
];

export function DashboardNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        aria-label="Dashboard navigation"
        className={`hidden lg:flex flex-col border-r border-border bg-muted/30 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex-1 pt-20 px-3 py-4">
          <nav aria-label="Main menu" className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-label={collapsed ? item.name : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-secondary hover:text-foreground hover:bg-muted"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className="flex items-center justify-center w-full py-2 text-secondary hover:text-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span className="ml-2 text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border lg:hidden"
      >
        <div className="flex items-center justify-around px-2 py-1">
          {mobileNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
