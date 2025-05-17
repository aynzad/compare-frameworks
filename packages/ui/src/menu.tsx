"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "./lib/utils";

export interface MenuItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  orientation?: "horizontal" | "vertical";
}

export function Menu({
  className,
  items,
  orientation = "horizontal",
  ...props
}: MenuProps) {
  return (
    <nav
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-center gap-6"
          : "flex-col gap-2",
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <a
            key={index}
            href={item.href}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors hover:text-foreground/80",
              item.isActive
                ? "text-foreground font-medium"
                : "text-foreground/60",
              orientation === "vertical" && "px-2 py-1.5"
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
