import { PageLayout } from "@repo/ui";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { Home, BarChart2 } from "lucide-react";

import "./globals.css";

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  const items = sidebarItems.map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
  }));

  return (
    <PageLayout
      sidebar={{
        items,
      }}
      header={<h1 className="text-xl font-semibold">React Router App</h1>}
    >
      <Outlet />
    </PageLayout>
  );
}
