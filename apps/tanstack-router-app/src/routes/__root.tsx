import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
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

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const items = sidebarItems.map((item) => ({
      ...item,
      isActive: window.location.pathname === item.href,
    }));

    return (
      <PageLayout
        sidebar={{ items }}
        header={<h1 className="text-xl font-semibold">TanStack Router App</h1>}
      >
        <Outlet />
      </PageLayout>
    );
  },
});
