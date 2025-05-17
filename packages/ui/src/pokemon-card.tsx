// import * as React from "react";
import { cn } from "./lib/utils";

export interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  className?: string;
}

export function PokemonCard({
  className,
  name,
  id,
  imageUrl,
  ...props
}: PokemonCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent/10",
        className
      )}
      {...props}
    >
      <div className="h-40 w-40 overflow-hidden rounded-md bg-muted/50 p-2">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          #{id.toString().padStart(3, "0")}
        </p>
        <h3 className="mt-1 font-semibold capitalize">{name}</h3>
      </div>
    </div>
  );
}
