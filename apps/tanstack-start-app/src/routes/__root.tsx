import { createRootRoute, Outlet } from "@tanstack/react-router";
import { PageLayout } from "@repo/ui";
import { Home, BarChart2 } from "lucide-react";
import type { QueryClient } from "@tanstack/react-query";

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
      header={<h1 className="text-xl font-semibold">TanStack Start App</h1>}
    >
      <Outlet />
    </PageLayout>
  ),
});

// This is needed for the router to work with React Query
declare module "@tanstack/react-router" {
  interface Register {
    context: {
      queryClient: QueryClient;
    };
  }
}
