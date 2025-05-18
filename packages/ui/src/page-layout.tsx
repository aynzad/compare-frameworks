"use client";

import React from "react";
import { cn } from "./lib/utils";
import type { SidebarProps } from "./sidebar";
import { Sidebar } from "./sidebar";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: SidebarProps;
  header?: React.ReactNode;
}

export function PageLayout({
  className,
  sidebar,
  header,
  children,
  ...props
}: PageLayoutProps) {
  return (
    <div
      className={cn("flex h-screen w-full overflow-hidden", className)}
      {...props}
    >
      <Sidebar {...sidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {header && (
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            {header}
          </header>
        )}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
