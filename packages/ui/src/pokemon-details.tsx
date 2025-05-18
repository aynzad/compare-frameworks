import { cn } from "./lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface PokemonDetailsProps {
  name: string;
  id: number;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  className?: string;
}

export function PokemonDetails({
  name,
  id,
  imageUrl,
  types,
  height,
  weight,
  abilities,
  stats,
  className,
  ...props
}: PokemonDetailsProps) {
  return (
    <div
      className={cn("container mx-auto max-w-4xl p-4", className)}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="h-32 w-32 overflow-hidden rounded-md bg-muted/50 p-2">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              #{id.toString().padStart(3, "0")}
            </p>
            <CardTitle className="text-2xl capitalize">{name}</CardTitle>
            <div className="mt-2 flex gap-2">
              {types.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium capitalize text-primary"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">About</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height</span>
                  <span>{height / 10}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span>{weight / 10}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Abilities</span>
                  <span className="capitalize">{abilities.join(", ")}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Base Stats</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center gap-2">
                    <span className="w-24 text-muted-foreground capitalize">
                      {stat.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(value / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-8 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
