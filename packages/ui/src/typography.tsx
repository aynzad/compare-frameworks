import * as React from "react";
import { cn } from "./lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "lead"
    | "large"
    | "small"
    | "muted";
}

export function Typography({
  className,
  as: Tag = "p",
  variant = "p",
  ...props
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        {
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl":
            variant === "h1",
          "scroll-m-20 text-3xl font-semibold tracking-tight": variant === "h2",
          "scroll-m-20 text-2xl font-semibold tracking-tight": variant === "h3",
          "scroll-m-20 text-xl font-semibold tracking-tight": variant === "h4",
          "scroll-m-20 text-lg font-semibold tracking-tight": variant === "h5",
          "scroll-m-20 text-base font-semibold tracking-tight":
            variant === "h6",
          "leading-7": variant === "p",
          "text-xl text-muted-foreground": variant === "lead",
          "text-lg font-semibold": variant === "large",
          "text-sm font-medium leading-none": variant === "small",
          "text-sm text-muted-foreground": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}
