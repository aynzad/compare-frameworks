import { createRootRoute, Outlet } from "@tanstack/react-router";
import { PageLayout } from "@repo/ui";
import { Home, BarChart2 } from "lucide-react";

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

export const Route = createRootRoute({
  component: () => (
    <PageLayout
      sidebar={{ items: sidebarItems }}
      header={<h1 className="text-xl font-semibold">TanStack Router App</h1>}
    >
      <Outlet />
    </PageLayout>
  ),
});
