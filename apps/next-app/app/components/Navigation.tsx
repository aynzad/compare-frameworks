"use client";

import { Home, BarChart2 } from "lucide-react";
import { PageLayout } from "@repo/ui";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Pokémon",
    href: "/pokemon",
    icon: BarChart2,
  },
];

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      sidebar={{
        items: sidebarItems,
      }}
      header={<h1 className="text-xl font-semibold">Next.js App</h1>}
    >
      {children}
    </PageLayout>
  );
}
