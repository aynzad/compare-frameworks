"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  icon?: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  onClick,
}: SidebarItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{label}</span>
    </a>
  );
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItemProps[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-[240px] flex-col border-r bg-background px-2 py-4",
        className
      )}
      {...props}
    >
      <div className="px-3 py-2">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
